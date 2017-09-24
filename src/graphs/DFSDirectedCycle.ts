import { GraphsAPI } from './api'
import { ContainersAPI, ContainersBuilders } from '../containers'
import { CommonsAPI, CommonsBuilder } from '../commons'
import DirectedCycle = GraphsAPI.DirectedCycle
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import Stack = ContainersAPI.Stack
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection

type VerticesFlags = {
    [vertexKey: string]: boolean
}

type EdgeTo<V> = {
    [vertexKey: string]: Vertex<V>
}

type Cycle<V> = Stack<Vertex<V>> | undefined

/**
 * This implementation uses depth-first search. The constructor takes time proportional to <tt>V</tt> + <tt>E</tt>
 * (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number of edges. Afterwards,
 * the <tt>hasCycle</tt> and <tt>cycle</tt> operations take constant time.
 * <p>
 * For additional documentation, see <a href="/algs4/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class DFSDirectedCycle<V> implements DirectedCycle<V> {
    private marked: VerticesFlags = {}
    private edgeTo: EdgeTo<V> = {}
    private onStack: VerticesFlags = {}
    private detectedCycle: Cycle<V>

    constructor(dg: Digraph<V>) {
        dg.asVerticesCollection().forEach(v => {
            if (!this.isMarked(v)) {
                this.dfs(dg, v)
            }
        })
    }

    private isMarked(v: Vertex<V>): boolean {
        return this.marked[v.key] !== undefined && this.marked[v.key] === true
    }

    private dfs(dg: Digraph<V>, v: Vertex<V>): void {
        this.onStack[v.key] = true
        this.marked[v.key] = true
        dg.adjacent(v).forEach(w => {
            if (this.detectedCycle) {
                return
            } else if (!this.isMarked(w)) {
                this.edgeTo[w.key] = v
                this.dfs(dg, w)
            } else if (this.onStack[w.key] === true) {
                this.detectedCycle = newStack()
                let x = v
                while (x && w && (x.key !== w.key)) {
                    this.detectedCycle.push(x)
                    x = this.edgeTo[x.key]
                }
                this.detectedCycle.push(w)
                this.detectedCycle.push(v)
            }
        })
        this.onStack[v.key] = false
    }

    hasCycle(): boolean {
        return !!this.detectedCycle
    }

    cycle(): Collection<Vertex<V>> {
        return !!this.detectedCycle ? this.detectedCycle.asCollection() : emptyCollection()
    }
}
