import {AdjacencyListDigraph} from '../../src/graphs/AdjacencyListDigraph'
import {GraphsBuilders} from '../../src/graphs/builders'
import {tinyDG} from '../data/tinyDG'
import {tinyDAG} from '../data/tinyDAG'

import verkey = GraphsBuilders.verkey
import vertex = GraphsBuilders.vertex
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import {GraphsAPI} from '../../src/graphs/api'
import Vertex = GraphsAPI.Vertex
import {CommonsAPI} from '../../src/commons/api'
import Collection = CommonsAPI.Collection
import VerticesPair = GraphsAPI.VerticesPair

function verticesToArray(vertices: Collection<Vertex<string>>): string[] {
    return vertices.reduce((acc, v) => [...acc, v.key], [] as string[])
}

function edgesToArray(edges: Collection<VerticesPair<string>>): string[] {
    return edges.reduce((acc, e) => [...acc, e[0].key + '->' + e[1].key], [] as string[])
}

describe('AdjacencyListDigraph', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)
    const tdag = digraphFromEdgesKeys(tinyDAG)
    let dg: AdjacencyListDigraph<string>

    beforeEach(() => {
        dg = new AdjacencyListDigraph<string>()
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
        it('should correctly show amount of verices in DAG', () => {
            expect(tdag.v()).toBe(13)
        })
        it('should correctly show amount of verices in DG', () => {
            expect(tiny.v()).toBe(13)
        })
    })

    describe('e', () => {
        it('should correctly show amount of edges in DAG', () => {
            expect(tdag.e()).toBe(15)
        })
        it('should correctly show amount of edges in DG', () => {
            expect(tiny.e()).toBe(22)
        })
    })

    describe('adjacent', () => {
        it('should correctly return adjacent vertices for DAG', () => {
            const zero = verticesToArray(tdag.adjacent(verkey('0')))
            expect(zero.length).toBe(3)
            expect(zero).toContain('6')
            expect(zero).toContain('1')
            expect(zero).toContain('5')

            const one = verticesToArray(tdag.adjacent(verkey('1')))
            expect(one.length).toBe(0)

            const two = verticesToArray(tdag.adjacent(verkey('2')))
            expect(two.length).toBe(2)
            expect(two).toContain('3')
            expect(two).toContain('0')

            const three = verticesToArray(tdag.adjacent(verkey('3')))
            expect(three.length).toBe(1)
            expect(three).toContain('5')

            const four = verticesToArray(tdag.adjacent(verkey('4')))
            expect(four.length).toBe(0)

            const five = verticesToArray(tdag.adjacent(verkey('5')))
            expect(five.length).toBe(1)
            expect(five).toContain('4')

            const six = verticesToArray(tdag.adjacent(verkey('6')))
            expect(six.length).toBe(2)
            expect(six).toContain('4')
            expect(six).toContain('9')

            const seven = verticesToArray(tdag.adjacent(verkey('7')))
            expect(seven.length).toBe(1)
            expect(seven).toContain('6')

            const eight = verticesToArray(tdag.adjacent(verkey('8')))
            expect(eight.length).toBe(1)
            expect(eight).toContain('7')

            const nine = verticesToArray(tdag.adjacent(verkey('9')))
            expect(nine.length).toBe(3)
            expect(nine).toContain('12')
            expect(nine).toContain('10')
            expect(nine).toContain('11')

            const ten = verticesToArray(tdag.adjacent(verkey('10')))
            expect(ten.length).toBe(0)

            const eleven = verticesToArray(tdag.adjacent(verkey('11')))
            expect(eleven.length).toBe(1)
            expect(eleven).toContain('12')

            const twelve = verticesToArray(tdag.adjacent(verkey('12')))
            expect(twelve.length).toBe(0)
        })
    })

    describe('outdegree', () => {
        it('should correctly calculate outdegree for every vertex in DAG', () => {
            expect(tdag.outdegree(verkey('0'))).toBe(3)
            expect(tdag.outdegree(verkey('1'))).toBe(0)
            expect(tdag.outdegree(verkey('2'))).toBe(2)
            expect(tdag.outdegree(verkey('3'))).toBe(1)
            expect(tdag.outdegree(verkey('4'))).toBe(0)
            expect(tdag.outdegree(verkey('5'))).toBe(1)
            expect(tdag.outdegree(verkey('6'))).toBe(2)
            expect(tdag.outdegree(verkey('7'))).toBe(1)
            expect(tdag.outdegree(verkey('8'))).toBe(1)
            expect(tdag.outdegree(verkey('9'))).toBe(3)
            expect(tdag.outdegree(verkey('10'))).toBe(0)
            expect(tdag.outdegree(verkey('11'))).toBe(1)
            expect(tdag.outdegree(verkey('12'))).toBe(0)
        })
        it('should correctly calculate outdegree for every vertex in DG', () => {
            expect(tiny.outdegree(verkey('0'))).toBe(2)
            expect(tiny.outdegree(verkey('1'))).toBe(0)
            expect(tiny.outdegree(verkey('2'))).toBe(2)
            expect(tiny.outdegree(verkey('3'))).toBe(2)
            expect(tiny.outdegree(verkey('4'))).toBe(2)
            expect(tiny.outdegree(verkey('5'))).toBe(1)
            expect(tiny.outdegree(verkey('6'))).toBe(4)
            expect(tiny.outdegree(verkey('7'))).toBe(2)
            expect(tiny.outdegree(verkey('8'))).toBe(1)
            expect(tiny.outdegree(verkey('9'))).toBe(2)
            expect(tiny.outdegree(verkey('10'))).toBe(1)
            expect(tiny.outdegree(verkey('11'))).toBe(2)
            expect(tiny.outdegree(verkey('12'))).toBe(1)
        })
    })

    describe('indegree', () => {
        it('should correctly calculate indegree for every vertex in DAG', () => {
            expect(tdag.indegree(verkey('0'))).toBe(1)
            expect(tdag.indegree(verkey('1'))).toBe(1)
            expect(tdag.indegree(verkey('2'))).toBe(0)
            expect(tdag.indegree(verkey('3'))).toBe(1)
            expect(tdag.indegree(verkey('4'))).toBe(2)
            expect(tdag.indegree(verkey('5'))).toBe(2)
            expect(tdag.indegree(verkey('6'))).toBe(2)
            expect(tdag.indegree(verkey('7'))).toBe(1)
            expect(tdag.indegree(verkey('8'))).toBe(0)
            expect(tdag.indegree(verkey('9'))).toBe(1)
            expect(tdag.indegree(verkey('10'))).toBe(1)
            expect(tdag.indegree(verkey('11'))).toBe(1)
            expect(tdag.indegree(verkey('12'))).toBe(2)
        })
        it('should correctly calculate indegree for every vertex in DG', () => {
            expect(tiny.indegree(verkey('0'))).toBe(2)
            expect(tiny.indegree(verkey('1'))).toBe(1)
            expect(tiny.indegree(verkey('2'))).toBe(2)
            expect(tiny.indegree(verkey('3'))).toBe(2)
            expect(tiny.indegree(verkey('4'))).toBe(3)
            expect(tiny.indegree(verkey('5'))).toBe(2)
            expect(tiny.indegree(verkey('6'))).toBe(2)
            expect(tiny.indegree(verkey('7'))).toBe(0)
            expect(tiny.indegree(verkey('8'))).toBe(1)
            expect(tiny.indegree(verkey('9'))).toBe(3)
            expect(tiny.indegree(verkey('10'))).toBe(1)
            expect(tiny.indegree(verkey('11'))).toBe(1)
            expect(tiny.indegree(verkey('12'))).toBe(2)
        })
    })

    describe('reverse', () => {
        it('should correctly reverse DAG', () => {
            const rev = tdag.reverse()
            expect(rev.v()).toBe(13)
            expect(rev.e()).toBe(15)
            const edges = edgesToArray(rev.asEdgesCollection())
            expect(edges.length).toBe(15)
            expect(edges).toContain('6->0')
            expect(edges).toContain('1->0')
            expect(edges).toContain('5->0')
            expect(edges).toContain('3->2')
            expect(edges).toContain('0->2')
            expect(edges).toContain('5->3')
            expect(edges).toContain('4->5')
            expect(edges).toContain('4->6')
            expect(edges).toContain('9->6')
            expect(edges).toContain('6->7')
            expect(edges).toContain('7->8')
            expect(edges).toContain('12->9')
            expect(edges).toContain('10->9')
            expect(edges).toContain('11->9')
            expect(edges).toContain('12->11')
        })
        it('should correctly reverse DG', () => {
            const rev = tiny.reverse()
            expect(rev.v()).toBe(13)
            expect(rev.e()).toBe(22)
            const edges = edgesToArray(rev.asEdgesCollection())
            expect(edges.length).toBe(22)
            expect(edges).toContain('1->0')
            expect(edges).toContain('5->0')
            expect(edges).toContain('3->2')
            expect(edges).toContain('0->2')
            expect(edges).toContain('2->3')
            expect(edges).toContain('5->3')
            expect(edges).toContain('2->4')
            expect(edges).toContain('3->4')
            expect(edges).toContain('4->5')
            expect(edges).toContain('0->6')
            expect(edges).toContain('8->6')
            expect(edges).toContain('4->6')
            expect(edges).toContain('9->6')
            expect(edges).toContain('9->7')
            expect(edges).toContain('6->7')
            expect(edges).toContain('6->8')
            expect(edges).toContain('10->9')
            expect(edges).toContain('11->9')
            expect(edges).toContain('12->10')
            expect(edges).toContain('12->11')
            expect(edges).toContain('4->11')
            expect(edges).toContain('9->12')
        })
    })

    describe('asVerticesCollection', () => {
        it('should return all vertices in DAG', () => {
            const result = verticesToArray(tdag.asVerticesCollection())
            expect(result.length).toBe(13)
            expect(result).toContain('0')
            expect(result).toContain('1')
            expect(result).toContain('2')
            expect(result).toContain('3')
            expect(result).toContain('4')
            expect(result).toContain('5')
            expect(result).toContain('6')
            expect(result).toContain('7')
            expect(result).toContain('8')
            expect(result).toContain('9')
            expect(result).toContain('10')
            expect(result).toContain('11')
            expect(result).toContain('12')
        })
        it('should return all vertices in DG', () => {
            const result = verticesToArray(tiny.asVerticesCollection())
            expect(result.length).toBe(13)
            expect(result).toContain('0')
            expect(result).toContain('1')
            expect(result).toContain('2')
            expect(result).toContain('3')
            expect(result).toContain('4')
            expect(result).toContain('5')
            expect(result).toContain('6')
            expect(result).toContain('7')
            expect(result).toContain('8')
            expect(result).toContain('9')
            expect(result).toContain('10')
            expect(result).toContain('11')
            expect(result).toContain('12')
        })
    })

    describe('asEdgesCollection', () => {
        it('should return all edges in DAG', () => {
            const result = edgesToArray(tdag.asEdgesCollection())
            expect(result.length).toBe(15)
            expect(result).toContain('0->6')
            expect(result).toContain('0->1')
            expect(result).toContain('0->5')
            expect(result).toContain('2->3')
            expect(result).toContain('2->0')
            expect(result).toContain('3->5')
            expect(result).toContain('5->4')
            expect(result).toContain('6->4')
            expect(result).toContain('6->9')
            expect(result).toContain('7->6')
            expect(result).toContain('8->7')
            expect(result).toContain('9->12')
            expect(result).toContain('9->10')
            expect(result).toContain('9->11')
            expect(result).toContain('11->12')
        })
        it('should return all edges in DG', () => {
            const result = edgesToArray(tiny.asEdgesCollection())
            expect(result.length).toBe(22)
            expect(result).toContain('0->1')
            expect(result).toContain('0->5')
            expect(result).toContain('2->3')
            expect(result).toContain('2->0')
            expect(result).toContain('3->2')
            expect(result).toContain('3->5')
            expect(result).toContain('4->2')
            expect(result).toContain('4->3')
            expect(result).toContain('5->4')
            expect(result).toContain('6->0')
            expect(result).toContain('6->8')
            expect(result).toContain('6->4')
            expect(result).toContain('6->9')
            expect(result).toContain('7->9')
            expect(result).toContain('7->6')
            expect(result).toContain('8->6')
            expect(result).toContain('9->10')
            expect(result).toContain('9->11')
            expect(result).toContain('10->12')
            expect(result).toContain('11->12')
            expect(result).toContain('11->4')
            expect(result).toContain('12->9')
        })
    })
})
