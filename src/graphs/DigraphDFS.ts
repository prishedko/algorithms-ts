import { IndexedByString, isMarked } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import DigraphSearch = GraphsAPI.DigraphSearch
import VertexVisitor = GraphsAPI.VertexVisitor
import newStack = ContainersBuilders.newStack

/**
 * Implementation of Depth First Search.
 */
export class DigraphDFS<V> implements DigraphSearch<V> {
    search(dg: GraphsAPI.Digraph<V>, source: GraphsAPI.Vertex<V>, visitor: GraphsAPI.VertexVisitor<V>): void {
        const bfs = new DFS(dg, source, visitor)
        bfs.search()
    }
}

class DFS<V> {
    private marked: IndexedByString<boolean> = {}

    constructor(private G: Digraph<V>, private source: Vertex<V>, private visitor: VertexVisitor<V>) {}

    search(): void {
        this.bfs(this.G, this.source)
    }

    private bfs(G: Digraph<V>, source: Vertex<V>): void {
        const s = newStack<Vertex<V>>()
        this.marked[source.key] = true
        s.push(source)
        while (!s.isEmpty()) {
            const v = s.pop()
            this.visitor(v)
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.marked[w.key] = true
                    s.push(w)
                }
            })
        }
    }
}
