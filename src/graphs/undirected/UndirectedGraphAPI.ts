import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {CommonsAPI} from '../../'
import Collection = CommonsAPI.Collection

import Vertex = CommonGraphAPI.Vertex
import VerticesPair = CommonGraphAPI.VerticesPair

export namespace UndirectedGraphAPI {
    /**
     * The {@code Graph} class represents an undirected graph of vertices. It supports the following two primary
     * operations: add an edge to the graph, iterate over all of the vertices adjacent to a vertex. It also provides
     * methods for returning the number of vertices <tt>V</tt> and the number of edges <tt>E</tt>. Parallel edges and
     * self-loops are permitted. By convention, a self-loop <tt>v</tt>-<tt>v</tt> appears in the adjacency list of
     * <tt>v</tt> twice and contributes two to the degree of <tt>v</tt>.
     */
    export interface Graph<V> {
        /**
         * Adds new vertext to this graph. If the graph already has vertex with the same key, it doesn't add new one.
         * @param {CommonGraphAPI.Vertex<V>} v new vertex.
         * @return {Graph<V>} graph with the added vertex.
         */
        addVertex(v: Vertex<V>): Graph<V>

        /**
         * Adds the undirected edge v-w to this graph. If any of the vertices in the edge is not in the graph,
         * the method adds the vertex.
         * @param v one vertex in the edge.
         * @param w the other vertex in the edge.
         * @return {Graph<V>} graph with the added edge.
         */
        addEdge(v: Vertex<V>, w: Vertex<V>): Graph<V>

        /**
         * Returns the number of vertices in the graph.
         * @return the number of vertices in the graph.
         */
        v(): number

        /**
         * Returns the number of edges in the graph.
         * @return the number of edges in the graph.
         */
        e(): number

        /**
         * Returns the vertices adjacent from given vertex in the graph. If there is no such vertex in the graph,
         * the method returns empty container.
         * @param v the vertex.
         * @return the vertices adjacent from given vertex in the graph or empty container.
         */
        adjacent(v: Vertex<V>): Collection<Vertex<V>>

        /**
         * Returns a string representation of the graph.
         * This method takes time proportional to <tt>E</tt> + <tt>V</tt>.
         * @return the number of vertices <tt>V</tt>, followed by the number of edges <tt>E</tt>, followed by the
         * <tt>V</tt> adjacency lists
         */
        toString(): string

        /**
         * Returns collection backed by vertices of this graph. Time complexity is O(1).
         * @return {CommonsAPI.Collection<CommonGraphAPI.Vertex<V>>} collection of vertices.
         */
        asVerticesCollection(): Collection<Vertex<V>>

        /**
         * Returns collection backed by edges of this graph. Time complexity is O(V + E).
         * @return {CommonsAPI.Collection<CommonGraphAPI.Vertex<V>>} collection of edges.
         */
        asEdgesCollection(): Collection<VerticesPair<V>>
    }

    /**
     * The {@code Bipartite} interface represents a data type for determining whether an undirected graph is
     * bipartite or whether it has an odd-length cycle. The <tt>isBipartite</tt> operation determines whether the graph
     * is bipartite. If so, the <tt>color</tt> operation determines a bipartition; if not, the <tt>oddCycle</tt>
     * operation determines a cycle with an odd number of edges.
     * <p>
     * For additional documentation, see <a href="http://algs4.cs.princeton.edu/41graph">Section 4.1</a>
     * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
     */
    export interface Bipartite<V> {
        /**
         * Returns <tt>true</tt> if the graph is bipartite.
         * @return {boolean} <tt>true</tt> if the graph is bipartite; <tt>false</tt> otherwise
         */
        isBipartite(): boolean

        /**
         * Returns the side of the bipartite that vertex <tt>v</tt> is on.
         * @param {CommonGraphAPI.Vertex<V>} v the vertex to check.
         * @return {boolean} the side of the bipartition that vertex <tt>v</tt> is on; two vertices are in the same
         * side of the bipartition if and only if they have the same color.
         */
        color(v: Vertex<V>): boolean

        /**
         * Returns an odd-length cycle if the graph is not bipartite.
         * @return {CommonsAPI.Collection<CommonGraphAPI.Vertex<V>>} an odd-length cycle if the graph is not bipartite
         * (and hence has an odd-length cycle), and empty collection otherwise
         */
        oddCycle(): Collection<Vertex<V>>
    }
}
