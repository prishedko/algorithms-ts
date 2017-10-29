import { StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { CommonsBuilder } from '../commons/builders'
import { DirectedDFS } from './DirectedDFS'

import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import Directed = GraphsAPI.Directed
import TransitiveClosure = GraphsAPI.TransitiveClosure
import collectionFromArray = CommonsBuilder.collectionFromArray

/**
 * This implementation runs depth-first search from each vertex. The constructor takes time proportional to
 * <em>V</em>(<em>V</em> + <em>E</em>) (in the worst case) and uses space proportional to <em>V</em><sup>2</sup>, where
 * <em>V</em> is the number of vertices and <em>E</em> is the number of edges.
 * <p>
 * For large digraphs, you may want to consider a more sophisticated algorithm.
 * <a href = "http://www.cs.hut.fi/~enu/thesis.html">Nuutila</a> proposes two algorithm for the problem (based on strong
 * components and an interval representation) that runs in <em>E</em> + <em>V</em> time on typical digraphs.
 */
export class TransitiveClosureDFS<V> implements TransitiveClosure<V> {
    private tc = new StringMap<Directed<V>>()   // tc[v] = reachable from v

    /**
     * Computes the transitive closure of the digraph <code>G</code>.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     */
    constructor(G: Digraph<V>) {
        G.asVerticesCollection().forEach(v => {
            this.tc.set(v.key, new DirectedDFS(G, collectionFromArray([v], false)))
        })
    }

    reachable(v: Vertex<V>, w: Vertex<V>): boolean {
        const directed = this.tc.get(v.key)
        if (directed) {
            return directed.marked(w)
        } else {
            return false
        }
    }
}
