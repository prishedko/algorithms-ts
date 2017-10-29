import { isMarked, StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { CommonsAPI } from '../commons/api'

import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import Directed = GraphsAPI.Directed
import Collection = CommonsAPI.Collection

/**
 * This implementation uses depth-first search. The constructor takes time proportional to <em>V</em> + <em>E</em>
 * (in the worst case), where <em>V</em> is the number of vertices and <em>E</em> is the number of edges.
 */
export class DirectedDFS<V> implements Directed<V> {
    private markedVertices = new StringMap<boolean>()   // marked[v] = true if v is reachable
                                                        // from source (or sources)
    private directedCount = 0                           // number of vertices reachable from s

    /**
     * Computes the vertices in digraph <code>G</code> that are connected to any of the source vertices
     * <code>sources</code>.
     * @param {GraphsAPI.Digraph<V>} G the graph
     * @param {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} sources the source vertices
     */
    constructor(G: Digraph<V>, sources: Collection<Vertex<V>>) {
        sources.forEach(v => {
            if (!isMarked(v, this.markedVertices)) {
                this.dfs(G, v)
            }
        })
    }

    private dfs(G: Digraph<V>, v: Vertex<V>): void {
        this.directedCount++
        this.markedVertices.set(v.key, true)
        G.adjacent(v).forEach(w => {
            if (!isMarked(w, this.markedVertices)) {
                this.dfs(G, w)
            }
        })
    }

    marked(v: Vertex<V>): boolean {
        return this.markedVertices.getOrDefault(v.key, false)
    }

    count(): number {
        return this.directedCount
    }
}
