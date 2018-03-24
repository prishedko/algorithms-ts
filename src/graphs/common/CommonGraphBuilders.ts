import {CommonGraphAPI} from './CommonGraphAPI'

/**
 * Factory functions for creating instances of {@link CommonGraphAPI} ADTs.
 */
export namespace CommonGraphBuilders {
    import Vertex = CommonGraphAPI.Vertex

    /**
     * Creates new vertex with given key and payload.
     * @param {string} key key.
     * @param {V} value payload.
     * @return {GraphsBuilders.Vertex<V>} new vertex.
     */
    export function vertex<V>(key: string, value: V): Vertex<V> {
        return {
            key: key,
            value: value
        }
    }

    /**
     * Creates new vertex with given key and with value === key.
     * @param {string} key key of the creating vertex.
     * @return {GraphsBuilders.Vertex<string>} vertex with value === key.
     */
    export function verkey(key: string): Vertex<string> {
        return vertex(key, key)
    }
}
