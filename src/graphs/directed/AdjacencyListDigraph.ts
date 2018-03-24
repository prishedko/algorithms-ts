import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {CommonsAPI} from '../../'
import {CommonsBuilder} from '../../'
import {Entry, StringMap} from '../common/AuxiliaryTypes'
import {AbstractIterator} from '../../commons/AbstractIterator'
import {AbstractCollection} from '../../commons/AbstractCollection'
import {DigraphAPI} from './DigraphAPI'

import Digraph = DigraphAPI.Digraph
import Vertex = CommonGraphAPI.Vertex
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import collectionFromArray = CommonsBuilder.collectionFromArray
import VerticesPair = CommonGraphAPI.VerticesPair
import CollectionIterator = CommonsAPI.CollectionIterator

type ListNode<V> = {
    readonly vertex: Vertex<V>
    readonly adjecent: Vertex<V>[]
}

class VerticesIterator<V> extends AbstractIterator<Vertex<V>> {
    private delegatee: CollectionIterator<Entry<ListNode<V>>>

    constructor(adjacencyList: StringMap<ListNode<V>>) {
        super()
        this.delegatee = adjacencyList.iterator()
    }

    hasNext(): boolean {
        return this.delegatee.hasNext()
    }

    next(): Vertex<V> {
        return this.delegatee.next().value.vertex
    }
}

class VerticesCollection<V> extends AbstractCollection<Vertex<V>> {
    constructor(private verticesAmount: () => number, private adjacencyList: StringMap<ListNode<V>>) {
        super()
    }

    size(): number {
        return this.verticesAmount()
    }

    iterator(): CommonsAPI.CollectionIterator<Vertex<V>> {
        return new VerticesIterator(this.adjacencyList)
    }
}

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
export class AdjacencyListDigraph<V> implements Digraph<V> {
    private adjacencyList = new StringMap<ListNode<V>>()
    private verticesAmount: number = 0
    private edgesAmount: number = 0
    private indegrees = new StringMap<number>()

    constructor(edges: VerticesPair<V>[] = []) {
        edges.forEach(edge => this.addEdge(edge[0], edge[1]))
    }

    addVertex(v: Vertex<V>): Digraph<V> {
        if (!this.adjacencyList.has(v.key)) {
            this.adjacencyList.set(v.key, {
                vertex: v,
                adjecent: []
            })
            this.verticesAmount++
        }
        return this
    }

    addEdge(from: Vertex<V>, to: Vertex<V>): Digraph<V> {
        this.addVertex(from)
        this.addVertex(to)
        this.adjacencyList.get(from.key)!.adjecent.push(to)
        this.edgesAmount++
        this.indegrees.set(to.key, this.indegrees.get(to.key) === undefined ? 1 : this.indegrees.get(to.key)! + 1)
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

    outdegree(v: Vertex<V>): number {
        if (this.adjacencyList.has(v.key)) {
            return this.adjacencyList.get(v.key)!.adjecent.length
        }
        return 0
    }

    indegree(v: Vertex<V>): number {
        if (this.indegrees.has(v.key)) {
            return this.indegrees.get(v.key)!
        }
        return 0
    }

    reverse(): Digraph<V> {
        const result = new AdjacencyListDigraph<V>()
        this.asVerticesCollection().forEach(v => {
            result.addVertex(v)
            this.adjacent(v).forEach(w => result.addEdge(w, v))
        })
        return result
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
        const edges: VerticesPair<V>[] = []
        this.asVerticesCollection().forEach(v => {
            this.adjacent(v).forEach(w => edges.push([v, w]))
        })
        return collectionFromArray(edges, false)
    }
}
