import { IndexedByString, isMarked } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers'
import { CommonsAPI, CommonsBuilder } from '../commons'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import DirectedPaths = GraphsAPI.DirectedPaths
import newQueue = ContainersBuilders.newQueue
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection

/**
 * This implementation uses breadth-first search. The constructor takes time proportional to <tt>V</tt> + <tt>E</tt>,
 * where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number of edges. It uses extra space (not including
 * the digraph) proportional to <tt>V</tt>.
 * <p>
 * For additional documentation,
 * see <a href="http://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class BreadthFirstDirectedPaths<V> implements DirectedPaths<V> {
    private marked: IndexedByString<boolean> = {}       // marked[v] = is there an s->v path?
    private edgeTo: IndexedByString<Vertex<V>> = {}     // edgeTo[v] = last edge on shortest s->v path

    /**
     * Computes the shortest path from any one of the source vertices in <code>sources</code> to every other vertex in
     * graph <code>G</code>.
     * @param {GraphsAPI.Digraph<V>} G the digraph
     * @param {GraphsAPI.Vertex<V>} source the source vertex
     */
    constructor(G: Digraph<V>, private source: Vertex<V>) {
        this.bfs(G, source)
    }

    private bfs(G: Digraph<V>, source: Vertex<V>): void {
        const q = newQueue<Vertex<V>>()
        this.marked[source.key] = true
        q.enqueue(source)
        while (!q.isEmpty()) {
            const v = q.dequeue()
            G.adjacent(v).forEach(w => {
                if (!isMarked(w, this.marked)) {
                    this.edgeTo[w.key] = v
                    this.marked[w.key] = true
                    q.enqueue(w)
                }
            })
        }
    }

    hasPathTo(v: Vertex<V>): boolean {
        return isMarked(v, this.marked)
    }

    pathTo(v: Vertex<V>): Collection<Vertex<V>> {
        if (!this.hasPathTo(v)) {
            return emptyCollection()
        }
        const path = newStack<Vertex<V>>()
        for (let x = v; x.key !== this.source.key; x = this.edgeTo[x.key]) {
            path.push(x)
        }
        path.push(this.source)
        return path.asCollection()
    }
}
