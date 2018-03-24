import {isMarked, StringMap} from '../common/AuxiliaryTypes'
import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {ContainersBuilders} from '../../'
import {DigraphAPI} from './DigraphAPI'

import Vertex = CommonGraphAPI.Vertex
import Digraph = DigraphAPI.Digraph
import DigraphSearch = DigraphAPI.DigraphSearch
import VertexVisitor = CommonGraphAPI.VertexVisitor
import newStack = ContainersBuilders.newStack

/**
 * Implementation of Depth First Search.
 */
export class DigraphDFS<V> implements DigraphSearch<V> {
    search(dg: Digraph<V>, source: Vertex<V>, visitor: VertexVisitor<V>): void {
        const bfs = new DFS(dg, source, visitor)
        bfs.search()
    }
}

class DFS<V> {
    private marked = new StringMap<boolean>()

    constructor(private G: Digraph<V>, private source: Vertex<V>, private visitor: VertexVisitor<V>) {
    }

    search(): void {
        this.bfs(this.G, this.source)
    }

    private bfs(G: Digraph<V>, source: Vertex<V>): void {
        const s = newStack<Vertex<V>>()
        this.marked.set(source.key, true)
        s.push(source)
        while (!s.isEmpty()) {
            const v = s.pop()
            this.visitor(v)
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.marked.set(w.key, true)
                    s.push(w)
                }
            })
        }
    }
}
