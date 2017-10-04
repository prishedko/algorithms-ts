import { IndexedByString, isMarked } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import DigraphSearch = GraphsAPI.DigraphSearch
import VertexVisitor = GraphsAPI.VertexVisitor
import newQueue = ContainersBuilders.newQueue

/**
 * Implementation of Breadth First Search.
 */
export class DigraphBFS<V> implements DigraphSearch<V> {
    search(dg: GraphsAPI.Digraph<V>, source: GraphsAPI.Vertex<V>, visitor: GraphsAPI.VertexVisitor<V>): void {
        const bfs = new BFS(dg, source, visitor)
        bfs.search()
    }
}

class BFS<V> {
    private marked: IndexedByString<boolean> = {}

    constructor(private G: Digraph<V>, private source: Vertex<V>, private visitor: VertexVisitor<V>) {}

    search(): void {
        this.bfs(this.G, this.source)
    }

    private bfs(G: Digraph<V>, source: Vertex<V>): void {
        const q = newQueue<Vertex<V>>()
        this.marked[source.key] = true
        q.enqueue(source)
        while (!q.isEmpty()) {
            const v = q.dequeue()
            this.visitor(v)
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.marked[w.key] = true
                    q.enqueue(w)
                }
            })
        }
    }
}
