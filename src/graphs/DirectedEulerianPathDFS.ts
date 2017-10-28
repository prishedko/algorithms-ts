import { StringMap, Cycle } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'
import { CommonsAPI } from '../commons/api'
import { CommonsBuilder } from '../commons/builders'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import CollectionIterator = CommonsAPI.CollectionIterator
import DirectedEulerianPath = GraphsAPI.DirectedEulerianPath

/**
 * This implementation uses a nonrecursive depth-first search. The constructor runs in O(E + V) time, and uses O(V)
 * extra space, where E is the number of edges and V the number of vertices. All other methods take O(1) time.
 * <p>
 * For additional documentation, see <a href="http://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class DirectedEulerianPathDFS<V> implements DirectedEulerianPath<V> {
    private eulerianPath: Cycle<V>   // Eulerian path; null if no suh path

    /**
     * Computes an Eulerian path in the specified digraph, if one exists.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        // must have at least one edge
        if (G.e() === 0) {
            return
        }
        // find vertex from which to start potential Eulerian path:
        // a vertex v with outdegree(v) > indegree(v) if it exits;
        // otherwise a vertex with outdegree(v) > 0
        let deficit = 0
        let s = this.nonIsolatedVertex(G)
        let t: Vertex<V> | undefined
        G.asVerticesCollection().forEach(v => {
            if (!t) {
                t = v
            }
            if (G.outdegree(v) > G.indegree(v)) {
                deficit += (G.outdegree(v) - G.indegree(v))
                s = v
            }
        })
        // digraph can't have an Eulerian path
        // (this condition is needed)
        if (deficit > 1) {
            return
        }
        // special case for digraph with zero edges (has a degenerate Eulerian path)
        if (!s) {
            s = t
        }
        // create local view of adjacency lists, to iterate one vertex at a time
        const adj = new StringMap<CollectionIterator<Vertex<V>>>()
        G.asVerticesCollection().forEach(v => adj.set(v.key, G.adjacent(v).iterator()))
        if (!s) {
            return
        }
        const stack = newStack<Vertex<V>>()
        stack.push(s)
        // greedily add to cycle, depth-first search style
        this.eulerianPath = newStack()
        while (!stack.isEmpty()) {
            let v = stack.pop()
            while (adj.get(v.key)!.hasNext()) {
                stack.push(v)
                v = adj.get(v.key)!.next()
            }
            // push vertex with no more available edges to path
            this.eulerianPath.push(v)
        }
        // check if all edges have been used
        if (this.eulerianPath.size() !== (G.e() + 1)) {
            this.eulerianPath = undefined
        }
    }

    // returns any non-isolated vertex; undefined if no such vertex
    private nonIsolatedVertex(G: Digraph<V>): Vertex<V> | undefined {
        return G.asVerticesCollection().find(v => G.outdegree(v) > 0)
    }

    path(): Collection<Vertex<V>> {
        return !!this.eulerianPath ? this.eulerianPath.asCollection() : emptyCollection()
    }

    hasEulerianPath(): boolean {
        return !!this.eulerianPath
    }
}
