import { IndexedByString, isMarked } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers'
import { CommonsAPI, CommonsBuilder } from '../commons'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import DirectedPaths = GraphsAPI.DirectedPaths
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection

/**
 * This implementation uses depth-first search. The constructor takes time proportional to <tt>V</tt> + <tt>E</tt>,
 * where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number of edges. It uses extra space (not including
 * the graph) proportional to <tt>V</tt>.
 * <p>
 * For additional documentation, see <a href="/algs4/41graph">Section 4.1</a> of
 * <i>Algorithms, 4th Edition</i>
 */
export class DepthFirstDirectedPaths<V> implements DirectedPaths<V> {
    private marked: IndexedByString<boolean> = {}       // marked[v] = true if v is reachable from s
    private edgeTo: IndexedByString<Vertex<V>> = {}     // edgeTo[v] = last edge on path from s to v

    constructor(G: Digraph<V>, private source: Vertex<V>) {
        this.dfs(G, source)
    }

    private dfs(G: Digraph<V>, source: Vertex<V>): void {
        const s = newStack<Vertex<V>>()
        this.marked[source.key] = true
        s.push(source)
        while (!s.isEmpty()) {
            const v = s.pop()
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.edgeTo[w.key] = v
                    this.marked[w.key] = true
                    s.push(w)
                }
            })
        }
    }

    hasPathTo(v: Vertex<V>): boolean {
        return isMarked(v, this.marked)
    }

    pathTo(v: Vertex<V>): Collection<Vertex<V>> {
        if (!this.hasPathTo(v)) {
            return emptyCollection()
        }
        const path = newStack<Vertex<V>>()
        for (let x = v; x.key !== this.source.key; x = this.edgeTo[x.key]) {
            path.push(x)
        }
        path.push(this.source)
        return path.asCollection()
    }
}
