import { isMarked, StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'

import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import newStack = ContainersBuilders.newStack
import StronglyConnectedComponents = GraphsAPI.StronglyConnectedComponents

/**
 * This implementation uses Tarjan's algorithm. The constructor takes time proportional to <em>V</em> + <em>E</em> (in
 * the worst case), where <em>V</em> is the number of vertices and <em>E</em> is the number of edges. Afterwards, the
 * <em>id</em>, <em>count</em>, and <em>areStronglyConnected</em> operations take constant time.
 * <p>
 * For additional documentation, see <a href="http://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of <i>Algorithms,
 * 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class TarjanSCC<V> implements StronglyConnectedComponents<V> {
    private marked = new StringMap<boolean>()   // marked[v] = has v been visited?
    private ids = new StringMap<number>()       // id[v] = id of strong component containing v
    private low = new StringMap<number>()       // low[v] = low number of v
    private pre = 0                             // preorder number counter
    private sccCount = 0                        // number of strongly-connected components
    private stack = newStack<Vertex<V>>()

    /**
     * Computes the strong components of the digraph <code>G</code>.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        G.asVerticesCollection().forEach(v => {
            if (!isMarked(v, this.marked)) {
                this.dfs(G, v)
            }
        })
    }

    private dfs(G: Digraph<V>, v: Vertex<V>): void {
        this.marked.set(v.key, true)
        this.low.set(v.key, this.pre++)
        let min = this.low.get(v.key)!
        this.stack.push(v)
        G.adjacent(v).forEach(w => {
            if (!isMarked(w, this.marked)) {
                this.dfs(G, w)
            }
            if (this.low.get(w.key)! < min) {
                min = this.low.get(w.key)!
            }
        })
        if (min < this.low.get(v.key)!) {
            this.low.set(v.key, min)
            return
        }
        let w
        do {
            w = this.stack.pop()
            this.ids.set(w.key, this.sccCount)
            this.low.set(w.key, G.v())
        } while (w !== v)
        this.sccCount++
    }

    count(): number {
        return this.sccCount
    }

    stronglyConnected(v: Vertex<V>, w: Vertex<V>): boolean {
        return this.ids.getOrDefault(v.key, -1) === this.ids.getOrDefault(w.key, -2)
    }

    id(v: Vertex<V>): number {
        return this.ids.getOrDefault(v.key, -1)
    }
}
