import { GraphsAPI } from './api'
import { CommonsAPI } from '../commons/api'
import { CommonsBuilder } from '../commons/builders'
import { StringMap } from './AuxiliaryTypes'
import Digraph = GraphsAPI.Digraph
import Vertex = GraphsAPI.Vertex
import Collection = CommonsAPI.Collection
import emptyCollection = CommonsBuilder.emptyCollection
import collectionFromArray = CommonsBuilder.collectionFromArray
import VerticesPair = GraphsAPI.VerticesPair

type ListNode<V> = {
    vertex: Vertex<V>
    adjecent: Vertex<V>[]
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
export class AdjacencyListDigraph<V> implements Digraph<V>, Collection<Vertex<V>> {
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

    reverse(): GraphsAPI.Digraph<V> {
        const result = new AdjacencyListDigraph<V>()
        this.forEach(v => {
            this.adjacent(v).forEach(w => result.addEdge(w, v))
        })
        return result
    }

    toString(): string {
        let s = ''
        s += this.verticesAmount + ' vertices, ' + this.edgesAmount + ' edges \n'
        this.adjacencyList.forEach((vertexKey, node) => {
            s += vertexKey + ':'
            node.adjecent.forEach(v =>  s += ' ' + v.key)
            s += '\n'
        })
        return s
    }

    asVerticesCollection(): Collection<Vertex<V>> {
        return this
    }

    asEdgesCollection(): Collection<VerticesPair<V>> {
        return new EdgesCollection(this.adjacencyList, () => this.edgesAmount)
    }

    map<T>(f: (e: GraphsAPI.Vertex<V>) => T): Collection<T> {
        const acc: T[] = []
        this.forEach(v => acc.push(f(v)))
        return collectionFromArray(acc, false)
    }

    filter(p: (e: GraphsAPI.Vertex<V>) => boolean): Collection<GraphsAPI.Vertex<V>> {
        const acc: Vertex<V>[] = []
        this.forEach(v => {
            if (p(v)) {
                acc.push(v)
            }
        })
        return collectionFromArray(acc, false)
    }

    forEach(f: (e: GraphsAPI.Vertex<V>) => void): void {
        this.adjacencyList.forEach((_, node) => f(node.vertex))
    }

    reduce<A>(r: (accumulator: A, currentElement: GraphsAPI.Vertex<V>) => A, initialValue: A): A {
        let acc = initialValue
        this.forEach(v => acc = r(acc, v))
        return acc
    }

    size(): number {
        return this.v()
    }
}

class EdgesCollection<V> implements Collection<VerticesPair<V>> {

    constructor(private adjacencyList: StringMap<ListNode<V>>, private edgesAmount: () => number) {}

    map<T>(f: (e: VerticesPair<V>) => T): Collection<T> {
        const result: T[] = []
        this.forEach(p => result.push(f(p)))
        return collectionFromArray(result, false)
    }

    filter(p: (e: VerticesPair<V>) => boolean): Collection<VerticesPair<V>> {
        const result: VerticesPair<V>[] = []
        this.forEach(pair => {
            if (p(pair)) {
                result.push(pair)
            }
        })
        return collectionFromArray(result, false)
    }

    forEach(f: (e: VerticesPair<V>) => void): void {
        this.adjacencyList.forEach((_, node) => {
            const v = node.vertex
            node.adjecent.forEach(w => f([v, w]))
        })
    }

    reduce<A>(r: (accumulator: A, currentElement: VerticesPair<V>) => A, initialValue: A): A {
        let acc = initialValue
        this.forEach(p => acc = r(acc, p))
        return acc
    }

    size(): number {
        return this.edgesAmount()
    }
}
