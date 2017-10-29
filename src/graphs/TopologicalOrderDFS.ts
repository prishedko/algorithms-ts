import { StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'
import { CommonsAPI } from '../commons/api'
import { CommonsBuilder } from '../commons/builders'
import { ContainersAPI } from '../containers/api'

import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import TopologicalOrder = GraphsAPI.TopologicalOrder
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import Queue = ContainersAPI.Queue
import newQueue = ContainersBuilders.newQueue

type Order<V> = Queue<Vertex<V>> | undefined

/**
 * This implementation uses a nonrecursive, queue-based algorithm. The constructor takes time proportional to
 * <tt>V</tt> + <tt>E</tt> (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number
 * of edges. Afterwards, the <tt>hasOrder</tt> and <tt>rank</tt> operations takes constant time; the <tt>order</tt>
 * operation takes time proportional to <tt>V</tt>.
 */
export class TopologicalOrderDFS<V> implements TopologicalOrder<V> {
    private topologicalOrder: Order<V>                    // vertices in topological order
    private ranks = new StringMap<number>()     // ranks[v] = order where vertex v appers in order

    /**
     * Determines whether the given digraph has a topological order and, if so, finds such a topological order.
     * @param {GraphsAPI.Digraph<V>} dg the digraph
     */
    constructor(dg: Digraph<V>) {
        // indegrees of remaining vertices
        const indegree = new StringMap<number>()
        // initialize queue to contain all vertices with indegree = 0
        const queue: Queue<Vertex<V>> = newQueue()
        dg.asVerticesCollection().forEach(v => {
            indegree.set(v.key, dg.indegree(v))
            if (indegree.get(v.key) === 0) {
                queue.enqueue(v)
            }
        })
        // initialize
        this.topologicalOrder = newQueue()
        let count = 0
        while (!queue.isEmpty()) {
            const v = queue.dequeue()
            this.topologicalOrder.enqueue(v)
            this.ranks.set(v.key, count++)
            dg.adjacent(v).forEach(w => {
                indegree.endoSet(w.key, u => u ? u - 1 : 0)
                if (indegree.get(w.key) === 0) {
                    queue.enqueue(w)
                }
            })
        }
        // there is a directed cycle in subgraph of vertices with indegree >= 1.
        if (count !== dg.v()) {
            this.topologicalOrder = undefined
        }
    }

    order(): Collection<Vertex<V>> {
        return !!this.topologicalOrder ? this.topologicalOrder.asCollection() : emptyCollection()
    }

    hasOrder(): boolean {
        return !!this.topologicalOrder
    }

    rank(v: Vertex<V>): number {
        if (this.hasOrder()) {
            return this.ranks.getOrDefault(v.key, -1)
        } else {
            return -1
        }
    }
}
