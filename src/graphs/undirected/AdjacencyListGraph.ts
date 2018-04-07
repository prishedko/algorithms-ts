import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {CommonsAPI} from '../../'
import {CommonsBuilder} from '../../'
import {StringMap, ListNode, VerticesCollection} from '../common/AuxiliaryTypes'
import {UndirectedGraphAPI} from './UndirectedGraphAPI'

import Graph = UndirectedGraphAPI.Graph
import Vertex = CommonGraphAPI.Vertex
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import collectionFromArray = CommonsBuilder.collectionFromArray
import VerticesPair = CommonGraphAPI.VerticesPair

/**
 * This implementation uses an adjacency-lists representation.
 * All operations take constant time (in the worst case) except
 * iterating over vertices and over the vertices adjacent from a given vertex, which takes
 * time proportional to the number of such vertices.
 * <p>
 * For additional documentation,
 * see <a href="http://algs4.cs.princeton.edu/42directed">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class AdjacencyListGraph<V> implements Graph<V> {
    private adjacencyList = new StringMap<ListNode<V>>()
    private verticesAmount: number = 0
    private edgesAmount: number = 0

    constructor(edges: VerticesPair<V>[] = []) {
        edges.forEach(edge => this.addEdge(edge[0], edge[1]))
    }

    addVertex(v: Vertex<V>): Graph<V> {
        if (!this.adjacencyList.has(v.key)) {
            this.adjacencyList.set(v.key, {
                vertex: v,
                adjecent: []
            })
            this.verticesAmount++
        }
        return this
    }

    addEdge(v: Vertex<V>, w: Vertex<V>): Graph<V> {
        this.addVertex(v)
        this.addVertex(w)
        this.adjacencyList.get(v.key)!.adjecent.push(w)
        this.adjacencyList.get(w.key)!.adjecent.push(v)
        this.edgesAmount++
        return this
    }

    v(): number {
        return this.verticesAmount
    }

    e(): number {
        return this.edgesAmount
    }

    adjacent(v: Vertex<V>): Collection<Vertex<V>> {
        if (this.adjacencyList.has(v.key)) {
            return collectionFromArray(this.adjacencyList.get(v.key)!.adjecent)
        }
        return emptyCollection()
    }

    toString(): string {
        let s = ''
        s += this.verticesAmount + ' vertices, ' + this.edgesAmount + ' edges \n'
        this.adjacencyList.forEach((vertexKey, node) => {
            s += vertexKey + ':'
            node.adjecent.forEach(v => s += ' ' + v.key)
            s += '\n'
        })
        return s
    }

    asVerticesCollection(): Collection<Vertex<V>> {
        return new VerticesCollection(() => this.v(), this.adjacencyList)
    }

    asEdgesCollection(): Collection<VerticesPair<V>> {
        function mappedKey(v: Vertex<V>, w: Vertex<V>): string {
            return `${v.key}-${w.key}`
        }

        const edges: VerticesPair<V>[] = []
        const mapped = new Map<string, boolean>()
        this.asVerticesCollection().forEach(v => {
            this.adjacent(v).forEach(w => {
                if (!mapped.has(mappedKey(v, w)) && !mapped.has(mappedKey(w, v))) {
                    edges.push([v, w])
                    mapped.set(mappedKey(v, w), true)
                }
            })
        })
        return collectionFromArray(edges, false)
    }
}
