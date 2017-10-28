import { StringMap, Cycle } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'
import { CommonsAPI } from '../commons/api'
import { CommonsBuilder } from '../commons/builders'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import DirectedEulerianCycle = GraphsAPI.DirectedEulerianCycle
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import CollectionIterator = CommonsAPI.CollectionIterator

/**
 * This implementation uses a nonrecursive depth-first search. The constructor runs in O(<tt>E</tt> + <tt>V</tt>) time,
 * and uses O(<tt>V</tt>) extra space, where <tt>E</tt> is the number of edges and <tt>V</tt> the number of vertices.
 * All other methods take O(1) time.
 * For additional documentation,
 * see <a href="http://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class DirectedEulerianCycleDFS<V> implements DirectedEulerianCycle<V> {
    private eulerianCycle: Cycle<V>  // Eulerian cycle; undefined if no such cylce

    /**
     * Computes an Eulerian cycle in the specified digraph, if one exists.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        // must have at least one edge
        if (G.e() === 0) {
            return
        }

        // necessary condition: indegree(v) = outdegree(v) for each vertex v
        // (without this check, DFS might return a path instead of a cycle)
        if (G.asVerticesCollection().some(v => G.outdegree(v) !== G.indegree(v))) {
            return
        }

        // create local view of adjacency lists, to iterate one vertex at a time
        const adj = new StringMap<CollectionIterator<Vertex<V>>>()
        G.asVerticesCollection().forEach(v => adj.set(v.key, G.adjacent(v).iterator()))

        // initialize stack with any non-isolated vertex
        const s = this.nonIsolatedVertex(G)
        if (!s) {
            return
        }
        const stack = newStack<Vertex<V>>()
        stack.push(s)

        // greedily add to putative cycle, depth-first search style
        this.eulerianCycle = newStack()
        while (!stack.isEmpty()) {
            let v = stack.pop()
            while (adj.get(v.key)!.hasNext()) {
                stack.push(v)
                v = adj.get(v.key)!.next()
            }
            // add vertex with no more leaving edges to cycle
            this.eulerianCycle.push(v)
        }

        // check if all edges have been used
        // (in case there are two or more vertex-disjoint Eulerian cycles)
        if (this.eulerianCycle.size() !== (G.e() + 1)) {
            this.eulerianCycle = undefined
        }
    }

    // returns any non-isolated vertex; undefined if no such vertex
    private nonIsolatedVertex(G: Digraph<V>): Vertex<V> | undefined {
        return G.asVerticesCollection().find(v => G.outdegree(v) > 0)
    }

    cycle(): Collection<Vertex<V>> {
        return !!this.eulerianCycle ? this.eulerianCycle.asCollection() : emptyCollection()
    }

    hasEulerianCycle(): boolean {
        return !!this.eulerianCycle
    }
}
