import {AdjacencyListGraph} from '../../../src/graphs/undirected/AdjacencyListGraph'
import {CommonGraphBuilders, UndirectedGraphBuilders} from '../../../src'
import {tinyCG} from '../../data/tinyCG'

import verkey = CommonGraphBuilders.verkey
import vertex = CommonGraphBuilders.vertex
import graphFromEdgesKeys = UndirectedGraphBuilders.graphFromEdgesKeys
import {CommonGraphAPI} from '../../../src'
import Vertex = CommonGraphAPI.Vertex
import {CommonsAPI} from '../../../src'
import Collection = CommonsAPI.Collection
import VerticesPair = CommonGraphAPI.VerticesPair

function verticesToArray(vertices: Collection<Vertex<string>>): string[] {
    return vertices.reduce((acc, v) => [...acc, v.key], [] as string[])
}

function edgesToArray(edges: Collection<VerticesPair<string>>): string[] {
    return edges.reduce((acc, e) => [...acc, e[0].key + '-' + e[1].key], [] as string[])
}

describe('AdjacencyListDigraph', () => {
    const tiny = graphFromEdgesKeys(tinyCG)
    let dg: AdjacencyListGraph<string>

    beforeEach(() => {
        dg = new AdjacencyListGraph<string>()
    })

    describe('addVertex', () => {
        it('should add vertex only if the vertex is not in the graph', () => {
            const v1 = verkey('one')
            const v2 = vertex('one', 'two')
            const v3 = verkey('two')
            expect(dg.v()).toBe(0)
            dg.addVertex(v1)
            expect(dg.v()).toBe(1)
            expect(dg.asVerticesCollection().reduce((_, v) => v, v2)).toBe(v1)
            dg.addVertex(v2)
            expect(dg.v()).toBe(1)
            expect(dg.asVerticesCollection().reduce((_, v) => v, v2)).toBe(v1)
            dg.addVertex(v3)
            expect(dg.v()).toBe(2)
        })
    })

    describe('addEdge', () => {
        it('should add vertices if they are not in the graph', () => {
            const v1 = verkey('one')
            const v2 = verkey('two')
            dg.addEdge(v1, v2)
            expect(dg.v()).toBe(2)
            expect(dg.e()).toBe(1)
        })
        it('should allow several similar edges', () => {
            const v1 = verkey('one')
            const v2 = verkey('two')
            dg.addEdge(v1, v2)
            dg.addEdge(v1, v2)
            dg.addEdge(v1, v2)
            expect(dg.v()).toBe(2)
            expect(dg.e()).toBe(3)
        })
        it('should allow reflective edges', () => {
            const v1 = verkey('one')
            const v2 = verkey('two')
            dg.addEdge(v1, v1)
            dg.addEdge(v1, v1)
            expect(dg.v()).toBe(1)
            expect(dg.e()).toBe(2)
            dg.addEdge(v2, v2)
            dg.addEdge(v2, v2)
            expect(dg.v()).toBe(2)
            expect(dg.e()).toBe(4)
        })
    })

    describe('v', () => {
        it('should correctly show amount of vertices in CG', () => {
            expect(tiny.v()).toBe(6)
        })
    })

    describe('e', () => {
        it('should correctly show amount of edges in CG', () => {
            expect(tiny.e()).toBe(8)
        })
    })

    describe('adjacent', () => {
        it('should correctly return adjacent vertices for CG', () => {
            const zero = verticesToArray(tiny.adjacent(verkey('0')))
            expect(zero.length).toBe(3)
            expect(zero).toContain('2')
            expect(zero).toContain('1')
            expect(zero).toContain('5')

            const one = verticesToArray(tiny.adjacent(verkey('1')))
            expect(one.length).toBe(2)
            expect(one).toContain('0')
            expect(one).toContain('2')

            const two = verticesToArray(tiny.adjacent(verkey('2')))
            expect(two.length).toBe(4)
            expect(two).toContain('0')
            expect(two).toContain('1')
            expect(two).toContain('3')
            expect(two).toContain('4')

            const three = verticesToArray(tiny.adjacent(verkey('3')))
            expect(three.length).toBe(3)
            expect(three).toContain('5')
            expect(three).toContain('4')
            expect(three).toContain('2')

            const four = verticesToArray(tiny.adjacent(verkey('4')))
            expect(four.length).toBe(2)
            expect(four).toContain('3')
            expect(four).toContain('2')

            const five = verticesToArray(tiny.adjacent(verkey('5')))
            expect(five.length).toBe(2)
            expect(five).toContain('3')
            expect(five).toContain('0')
        })
    })

    describe('asVerticesCollection', () => {
        it('should return all vertices in CG', () => {
            const result = verticesToArray(tiny.asVerticesCollection())
            expect(result.length).toBe(6)
            expect(result).toContain('0')
            expect(result).toContain('1')
            expect(result).toContain('2')
            expect(result).toContain('3')
            expect(result).toContain('4')
            expect(result).toContain('5')
        })
    })

    describe('asEdgesCollection', () => {
        it('should return all edges in CG', () => {
            const result = edgesToArray(tiny.asEdgesCollection())
            expect(result.length).toBe(8)
            expect(result).toContain('0-5')
            expect(result).toContain('2-4')
            expect(result).toContain('2-3')
            expect(result).toContain('1-2')
            expect(result).toContain('0-1')
            expect(result).toContain('3-4')
            expect(result).toContain('3-5')
            expect(result).toContain('0-2')
        })
    })
})
