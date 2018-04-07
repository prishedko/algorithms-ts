import {isMarked, StringMap} from '../common/AuxiliaryTypes'
import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {ContainersBuilders} from '../../'
import {CommonsAPI} from '../../'
import {UndirectedGraphAPI} from './UndirectedGraphAPI'

import Vertex = CommonGraphAPI.Vertex
import Graph = UndirectedGraphAPI.Graph
import Bipartite = UndirectedGraphAPI.Bipartite
import Collection = CommonsAPI.Collection
import newQueue = ContainersBuilders.newQueue
import newStack = ContainersBuilders.newStack

const WHITE: boolean = false

/**
 * This implementation uses breadth-first search and is non-recursive. The constructor takes time proportional to
 * <tt>V</tt> + <tt>E</tt> (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number
 * of edges. Afterwards, the <tt>isBipartite</tt> and <tt>color</tt> operations take constant time; the
 * <tt>oddCycle</tt> operation takes time proportional to the length of the cycle.
 */
export class BipartiteBFS<V> implements Bipartite<V> {
    private isGraphBipartite: boolean = true            // is the graph bipartite?
    private verticesColors = new StringMap<boolean>()   // verticesColors[v] gives vertices on one side of bipartition
    private marked = new StringMap<boolean>()           // marked[v] = true if v has been visited in DFS
    private edgeTo = new StringMap<Vertex<V>>()         // edgeTo[v] = last edge on path to v
    private oddLengthCycle = newQueue<Vertex<V>>()      // odd-length cycle

    constructor(G: Graph<V>) {
        G.asVerticesCollection().forEach(v => {
            if (this.isGraphBipartite) {
                if (!isMarked(v, this.marked)) {
                    this.bfs(G, v)
                }
            }
        })
    }

    private bfs(G: Graph<V>, s: Vertex<V>): void {
        const q = newQueue<Vertex<V>>()
        this.verticesColors.set(s.key, WHITE)
        this.marked.set(s.key, true)
        q.enqueue(s)

        while (!q.isEmpty()) {
            const v = q.dequeue()
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.marked.set(w.key, true)
                    this.edgeTo.set(w.key, v)
                    this.verticesColors.set(w.key, !this.verticesColors.get(v.key)!)
                    q.enqueue(w)
                } else if (this.verticesColors.get(w.key) === this.verticesColors.get(v.key)) {
                    this.isGraphBipartite = false
                    // to form odd cycle, consider s-v path and s-w path
                    // and let x be closest node to v and w common to two paths
                    // then (w-x path) + (x-v path) + (edge v-w) is an odd-length cycle
                    // Note: distTo[v] == distTo[w];
                    const stack = newStack<Vertex<V>>()
                    let x = v
                    let y = w
                    while (x.key !== y.key) {
                        stack.push(x)
                        this.oddLengthCycle.enqueue(y)
                        x = this.edgeTo.get(x.key)!
                        y = this.edgeTo.get(y.key)!
                    }
                    stack.push(x)
                    while (!stack.isEmpty()) {
                        this.oddLengthCycle.enqueue(stack.pop())
                    }
                    this.oddLengthCycle.enqueue(w)
                }
            })
        }
    }

    isBipartite(): boolean {
        return this.isGraphBipartite
    }

    color(v: Vertex<V>): boolean {
        if (!this.isGraphBipartite) {
            throw new Error('Graph is not bipartite')
        }
        return this.verticesColors.get(v.key)!
    }

    oddCycle(): Collection<Vertex<V>> {
        return this.oddLengthCycle.asCollection()
    }
}
