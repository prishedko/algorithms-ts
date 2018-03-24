import {isMarked, StringMap} from '../common/AuxiliaryTypes'
import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {DepthFirstOrderDFS} from './DepthFirstOrderDFS'
import {DigraphAPI} from './DigraphAPI'

import Vertex = CommonGraphAPI.Vertex
import Digraph = DigraphAPI.Digraph
import StronglyConnectedComponents = DigraphAPI.StronglyConnectedComponents

/**
 * This implementation uses the Kosaraju-Sharir algorithm. The constructor takes time proportional to
 * <tt>V</tt> + <tt>E</tt> (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number
 * of edges. Afterwards, the <tt>id</tt>, <tt>count</tt>, and <tt>areStronglyConnected</tt> operations take constant
 * time.
 */
export class KosarajuSharirSCC<V> implements StronglyConnectedComponents<V> {
    private marked = new StringMap<boolean>()   // marked[v] = has vertex v been visited?
    private ids = new StringMap<number>()       // id[v] = id of strong component containing v
    private sccCount = 0                        // number of strongly-connected components

    /**
     * Computes the strong components of the digraph <code>G</code>.
     * @param {Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        // compute reverse postorder of reverse graph
        const dfs = new DepthFirstOrderDFS(G.reverse())
        // run DFS on G, using reverse postorder to guide calculation
        dfs.reversePost().forEach(v => {
            if (!isMarked(v, this.marked)) {
                this.dfs(G, v)
                this.sccCount++
            }
        })
    }

    // DFS on graph G
    private dfs(G: Digraph<V>, v: Vertex<V>): void {
        this.marked.set(v.key, true)
        this.ids.set(v.key, this.sccCount)
        G.adjacent(v).forEach(w => {
            if (!isMarked(w, this.marked)) {
                this.dfs(G, w)
            }
        })
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
