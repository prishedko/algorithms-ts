/**
 * Defines ADTs that are used in different graphs' algorithms.
 */
export namespace CommonGraphAPI {
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
}
