import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {ContainersAPI} from '../../'
import {ContainersBuilders} from '../../'
import {CommonsAPI} from '../../'
import {CommonsBuilder} from '../../'
import {DigraphAPI} from './DigraphAPI'
import {isMarked, StringMap, Cycle} from '../common/AuxiliaryTypes'

import DirectedCycle = DigraphAPI.DirectedCycle
import Vertex = CommonGraphAPI.Vertex
import Digraph = DigraphAPI.Digraph
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import Queue = ContainersAPI.Queue
import newQueue = ContainersBuilders.newQueue

/**
 * This implementation uses a nonrecursive, queue-based algorithm. The constructor takes time proportional to <tt>V</tt>
 * + <tt>E</tt> (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number of edges.
 * Afterwards, the <tt>hasCycle</tt> and <tt>cycle</tt> operations take constant time.
 */
export class QueueDirectedCycle<V> implements DirectedCycle<V> {
    private detectedCycle: Cycle<V>

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
        while (!queue.isEmpty()) {
            const v = queue.dequeue()
            dg.adjacent(v).forEach(w => {
                indegree.set(w.key, indegree.get(w.key)! - 1)
                if (indegree.get(w.key) === 0) {
                    queue.enqueue(w)
                }
            })
        }
        // there is a directed cycle in subgraph of vertices with indegree >= 1.
        const edgeTo = new StringMap<Vertex<V>>()
        let root: Vertex<V> | undefined
        dg.asVerticesCollection().forEach(v => {
            if (indegree.get(v.key) === 0) {
                return
            } else {
                root = v
            }
            dg.adjacent(v).forEach(w => {
                if (indegree.get(w.key)! > 0) {
                    edgeTo.set(w.key, v)
                }
            })
        })

        if (root) {
            // find any vertex on cycle
            const visited = new StringMap<boolean>()
            while (!isMarked(root!, visited)) {
                visited.set(root!.key, true)
                root = edgeTo.get(root!.key)
            }
            // extract cycle
            this.detectedCycle = newStack()
            let v = root!
            do {
                this.detectedCycle.push(v)
                v = edgeTo.get(v.key)!
            } while (v !== root)
            this.detectedCycle.push(root)
        }
    }

    hasCycle(): boolean {
        return !!this.detectedCycle
    }

    cycle(): Collection<Vertex<V>> {
        return !!this.detectedCycle ? this.detectedCycle.asCollection() : emptyCollection()
    }
}
