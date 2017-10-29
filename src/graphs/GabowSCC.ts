import { isMarked, StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'

import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import newStack = ContainersBuilders.newStack
import StronglyConnectedComponents = GraphsAPI.StronglyConnectedComponents

/**
 * This implementation uses the Gabow's algorithm. The constructor takes time proportional to <em>V</em> + <em>E</em>
 * (in the worst case), where <em>V</em> is the number of vertices and <em>E</em> is the number of edges. Afterwards,
 * the <em>id</em>, <em>count</em>, and <em>areStronglyConnected</em> operations take constant time.
 */
export class GabowSCC<V> implements StronglyConnectedComponents<V> {
    private marked = new StringMap<boolean>()   // marked[v] = has v been visited?
    private ids = new StringMap<number>()       // ids[v] = ids of strong component containing v
    private preorder = new StringMap<number>()  // preorder[v] = preorder of v
    private pre = 0                             // preorder number counter
    private sccCount = 0                           // number of strongly-connected components
    private stack1 = newStack<Vertex<V>>()
    private stack2 = newStack<Vertex<V>>()

    /**
     * Computes the strong components of the digraph <code>G</code>.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        G.asVerticesCollection().forEach(v => this.ids.set(v.key, -1))
        G.asVerticesCollection().forEach(v => {
            if (!isMarked(v, this.marked)) {
                this.dfs(G, v)
            }
        })
    }

    private dfs(G: Digraph<V>, v: Vertex<V>): void {
        this.marked.set(v.key, true)
        this.preorder.set(v.key, this.pre++)
        this.stack1.push(v)
        this.stack2.push(v)
        G.adjacent(v).forEach(w => {
            if (!isMarked(w, this.marked)) {
                this.dfs(G, w)
            } else if (this.ids.get(w.key) === -1) {
                while (this.preorder.getOrDefault(this.stack2.peek().key, -1) > this.preorder.getOrDefault(w.key, -1)) {
                    this.stack2.pop()
                }
            }
        })
        // found strong component containing v
        if (this.stack2.peek() === v) {
            this.stack2.pop()
            let w: Vertex<V>
            do {
                w = this.stack1.pop()
                this.ids.set(w.key, this.sccCount)
            } while (w !== v)
            this.sccCount++
        }
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
