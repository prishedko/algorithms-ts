import { CommonsAPI } from '../commons/api'
import Collection = CommonsAPI.Collection

/**
 * Defines ADTs that model different graphs and graphs' algorithms.
 */
export namespace GraphsAPI {
    /**
     * Represends graph vertex with unique key and with some payload.
     */
    export type Vertex<V> = {
        /**
         * Vertexes key. Vertices with the same key are concidered identical.
         */
        readonly key: string
        /**
         * Vertexes payload.
         */
        readonly value: V
    }

    /**
     * Pair of vertices.
     */
    export type VerticesPair<V> = [Vertex<V>, Vertex<V>]

    /**
     * Function that takes a vertex and do some processing.
     */
    export type VertexVisitor<V> = (v: Vertex<V>) => void

    /**
     * The <tt>Digraph</tt> class represents a directed graph of vertices. It supports adding new vertices and edges,
     * iteration over all vertices and iteration over all of the vertices adjecent from a given vertex. Parallel
     * edges and self-loops are permitted.
     */
    export interface Digraph<V> {
        /**
         * Adds new vertext to the digraph. If digraph already has vertex with the same key, it doesn't add new one.
         * @param {GraphsAPI.Vertex<V>} v new vertex.
         * @return {GraphsAPI.Digraph<V>} digraph with the added vertex.
         */
        addVertex(v: Vertex<V>): Digraph<V>
        /**
         * Adds the directed edge 'from -> to' to the digraph. If any of the vertices in the edge is not in the digraph,
         * the method adds the vertex.
         * @param from the tail vertex.
         * @param to the head vertex.
         * @return {GraphsAPI.Digraph<V>} digraph with the added edge.
         */
        addEdge(from: Vertex<V>, to: Vertex<V>): Digraph<V>
        /**
         * Returns the number of vertices in the digraph.
         * @return the number of vertices in the digraph.
         */
        v(): number
        /**
         * Returns the number of edges in the digraph.
         * @return the number of edges in the digraph.
         */
        e(): number
        /**
         * Returns the vertices adjacent from given vertex in the digraph. If there is no such vertex in the digraph,
         * the method returns empty container.
         * @param v the vertex.
         * @return the vertices adjacent from given vertex in the digraph or empty container.
         */
        adjacent(v: Vertex<V>): Collection<Vertex<V>>
        /**
         * Returns the number of directed edges incident from vertex <code>v</code>. This is known as the
         * <tt>outdegree</tt> of vertex <code>v</code>.
         * @param {GraphsAPI.Vertex<V>} v the vertex
         * @return {number} the outdegree of vertex <code>v</code> or 0 if there is no such vertex in the graph.
         */
        outdegree(v: Vertex<V>): number
        /**
         * Returns the number of directed edges incident to vertex <code>v</code>. This is known as the
         * <tt>indegree</tt> of vertex <code>v</code>.
         * @param {GraphsAPI.Vertex<V>} v the vertex
         * @return {number} the indegree of vertex <code>v</code> or 0 if there is no such vertex in the graph.
         */
        indegree(v: Vertex<V>): number
        /**
         * Returns the reverse of the digraph.
         * @return the reverse of the digraph
         */
        reverse(): Digraph<V>
        /**
         * Returns a string representation of the graph.
         * This method takes time proportional to <tt>E</tt> + <tt>V</tt>.
         * @return the number of vertices <tt>V</tt>, followed by the number of edges <tt>E</tt>, followed by the
         * <tt>V</tt> adjacency lists
         */
        toString(): string
        /**
         * Returns collection backed by vertices of this graph. Time complexity is O(1).
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} collection of vertices.
         */
        asVerticesCollection(): Collection<Vertex<V>>
        /**
         * Returns collection backed by edges of this graph. Time complexity is O(V + E).
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} collection of edges.
         */
        asEdgesCollection(): Collection<VerticesPair<V>>
    }

    /**
     * The <tt>DirectedCycle</tt> class represents a data type for determining whether the underlying digraph has a
     * directed cycle. The <tt>hasCycle</tt> operation determines whether the digraph has a directed cycle and, and of
     * so, the <tt>cycle</tt> operation returns one.
     * <p/>
     * Be aware that this algorithm just detects whethere there is at least one cycle. So if there are several cycles,
     * <tt>DirectedCycle</tt> returns only one of them without any guarantee which one.
     * <p/>
     * Underlying digraph is anylized during creating instance of <tt>DirectedCycle</tt>. It means
     * that if you have another digraph or even if you've changed underlying digraph after creating an instance of
     * DirectedCycle, you should create new instance of DirectedCycle for new/changed digraph.
     * <p/>
     * Graph analysis runs in O(E + V) time during the instance creating. Than running times of <tt>hasCycle</tt>
     * and <tt>cycle</tt> are O(1).
     */
    export interface DirectedCycle<V> {
        /**
         * Does the digraph have a directed cycle?
         * @return <tt>true</tt> if the digraph has a directed cycle, <tt>false</tt> otherwise.
         */
        hasCycle(): boolean

        /**
         * Returns a directed cycle if the digraph has a directed cycle, and [] otherwise.
         * @return a directed cycle if the digraph has a directed cycle, and [] otherwise.
         */
        cycle(): Collection<Vertex<V>>
    }

    /**
     * The <code>DirectedPaths</code> class represents a data type for finding shortest paths (number of edges) from a
     * source vertex that was used to create instance of <code>DirectedPaths</code> (or set of source vertices) to
     * every other vertex in the digraph.
     */
    export interface DirectedPaths<V> {
        /**
         * Is there a directed path from the source (or sources) to vertex <code>v</code>?
         * @param {GraphsAPI.Vertex<V>} v the vertex
         * @return {boolean} <code>true</code> if there is a directed path, <code>false</code> otherwise. Also returns
         * <code>false</code> if the vertex is not in the graph.
         */
        hasPathTo(v: Vertex<V>): boolean
        /**
         * Returns a shortest path from source (or sources) to vertex <code>v</code>, or empty collection if no such
         * path.
         * @param {GraphsAPI.Vertex<V>} v the vertex
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} the sequence of vertices on a shortest path, as a
         * Collection.
         */
        pathTo(v: Vertex<V>): Collection<Vertex<V>>
    }

    /**
     * Defines API for digraph search.
     */
    export interface DigraphSearch<V> {
        /**
         * Does a search. Visits all vertices that are reachable from given source vertex (including source itself).
         * @param {GraphsAPI.Digraph<V>} dg digraph to search.
         * @param {GraphsAPI.Vertex<V>} source source vertex.
         * @param {GraphsAPI.VertexVisitor<V>} visitor function that processes all found vetices.
         */
        search(dg: Digraph<V>, source: Vertex<V>, visitor: VertexVisitor<V>): void
    }

    /**
     * The <code>DepthFirstOrder</code> class represents a data type for determining depth-first search ordering of the
     * vertices in a digraph or edge-weighted digraph, including preorder, postorder, and reverse postorder.
     */
    export interface DepthFirstOrder<V> {
        /**
         * Returns the preorder number of vertex <code>v</code>.
         * @param  v the vertex
         * @return the preorder number of vertex <code>v</code> or -1 if the vertex is not in the graph.
         */
        preorderNumber(v: Vertex<V>): number
        /**
         * Returns the postorder number of vertex <code>v</code>.
         * @param  v the vertex
         * @return the postorder number of vertex <code>v</code> or -1 if the vertex is not in the graph.
         */
        postorderNumber(v: Vertex<V>): number
        /**
         * Returns the vertices in postorder.
         * @return the vertices in postorder, as an iterable of vertices
         */
        post(): Collection<Vertex<V>>
        /**
         * Returns the vertices in preorder.
         * @return the vertices in preorder, as an iterable of vertices
         */
        pre(): Collection<Vertex<V>>
        /**
         * Returns the vertices in reverse postorder.
         * @return the vertices in reverse postorder, as an iterable of vertices
         */
        reversePost(): Collection<Vertex<V>>
    }

    /**
     * The <code>DirectedEulerianCycle</code> class represents a data type for finding an Eulerian cycle or path in a
     * digraph. An <tt>Eulerian cycle</tt> is a cycle (not necessarily simple) that uses every edge in the digraph
     * exactly once.
     */
    export interface DirectedEulerianCycle<V> {
        /**
         * Returns the sequence of vertices on an Eulerian cycle.
         * @return the sequence of vertices on an Eulerian cycle or empty collection if no such cycle.
         */
        cycle(): Collection<Vertex<V>>
        /**
         * Returns true if the digraph has an Eulerian cycle.
         * @return <code>true</code> if the digraph has an Eulerian cycle; <code>false</code> otherwise.
         */
        hasEulerianCycle(): boolean
    }

    /**
     * Represents a data type for determining a topological order of a directed acyclic graph (DAG). Recall, a digraph
     * has a topological order if and only if it is a DAG. The <tt>hasOrder</tt> operation determines whether the
     * digraph has a topological order, and if so, the <tt>order</tt> operation returns one.
     */
    export interface TopologicalOrder<V> {
        /**
         * Returns a topological order if the digraph has a topologial order, and empty collection otherwise.
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} a topological order of the vertices (as an interable)
         * if the digraph has a topological order (or equivalently, if the digraph is a DAG), and empty collection
         * otherwise.
         */
        order(): Collection<Vertex<V>>
        /**
         * Does the digraph have a topological order?
         * @return {boolean} <code>true</code> if the digraph has a topological order (or equivalently, if the digraph
         * is a DAG), and <code>false</code> otherwise.
         */
        hasOrder(): boolean
        /**
         * The the rank of given vertex in the topological order; -1 if the digraph is not a DAG.
         * @param {GraphsAPI.Vertex<V>} v vertex
         * @return {number} the position of the vertex in a topological order of the digraph; -1 if the digraph is not
         * a DAG.
         */
        rank(v: Vertex<V>): number
    }

    /**
     * The <code>DirectedEulerianPath</code> class represents a data type for finding an Eulerian path in a digraph.
     * An <tt>Eulerian path</tt> is a path (not necessarily simple) that uses every edge in the digraph exactly once.
     */
    export interface DirectedEulerianPath<V> {
        /**
         * Returns the sequence of vertices on an Eulerian path.
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} the sequence of vertices on an Eulerian path; empty
         * collection if no such path.
         */
        path(): Collection<Vertex<V>>

        /**
         * Returns <code>true</code> if the digraph has an Eulerian path.
         * @return {boolean} <code>true</code> if the digraph has an Eulerian path; <code>false</code> otherwise.
         */
        hasEulerianPath(): boolean
    }

    /**
     * Represents a data type for determining the strong components in a digraph. The <tt>id</tt> operation determines
     * in which strong component a given vertex lies; the <tt>areStronglyConnected</tt> operation determines whether
     * two vertices are in the same strong component; and the <tt>count</tt> operation determines the number of strong
     * components.
     * The <tt>component identifier</tt> of a component is one of the vertices in the strong component: two vertices
     * have the same component identifier if and only if they are in the same strong component.
     */
    export interface StronglyConnectedComponents<V> {
        /**
         * Returns the number of strong components.
         * @return {number} the number of strong components
         */
        count(): number
        /**
         * Are vertices <code>v</code> and <code>w</code> in the same strong component?
         * @param {GraphsAPI.Vertex<V>} v one vertex
         * @param {GraphsAPI.Vertex<V>} w the other vertex
         * @return {boolean} <code>true</code> if vertices <code>v</code> and <code>w</code> are in the same strong
         * component, and <code>false</code> otherwise
         */
        stronglyConnected(v: Vertex<V>, w: Vertex<V>): boolean
        /**
         * Returns the component id of the strong component containing vertex <code>v</code>.
         * @param {GraphsAPI.Vertex<V>} v the vertex.
         * @return {number} the component id of the strong component containing vertex <code>v</code> or -1 if the
         * vertex is not in the graph.
         */
        id(v: Vertex<V>): number
    }

    /**
     *  The <code>Directed</code> class represents a data type for determining the vertices reachable from a given
     *  source vertex <tt>s</tt> (or set of source vertices) in a digraph.
     */
    export interface Directed<V> {
        /**
         * Is there a directed path from the source vertex (or any of the source vertices) and vertex <code>v</code>?
         * @param {GraphsAPI.Vertex<V>} v the vertex
         * @return {boolean} <code>true</code> if there is a directed path, <code>false</code> otherwise.
         */
        marked(v: Vertex<V>): boolean
        /**
         * Returns the number of vertices reachable from the source vertex (or source vertices).
         * @return {number} the number of vertices reachable from the source vertex (or source vertices).
         */
        count(): number
    }

    /**
     *  The <code>TransitiveClosure</code> class represents a data type for computing the transitive closure of a
     *  digraph.
     */
    export interface TransitiveClosure<V> {
        /**
         * Is there a directed path from vertex <code>source</code> to vertex <code>destination</code> in the digraph?
         * @param {GraphsAPI.Vertex<V>} source the source vertex
         * @param {GraphsAPI.Vertex<V>} destination the target vertex
         * @return {boolean} <code>true</code> if there is a directed path from <code>source</code> to <code>w</code>,
         * <code>false</code> otherwise.
         */
        reachable(source: Vertex<V>, destination: Vertex<V>): boolean
    }
}
