import { GraphsBuilders, GraphsAPI } from '../../src'
import { tinyDG } from './tinyDG'
import digraph = GraphsBuilders.digraph
import vertex = GraphsBuilders.vertex
import verkey = GraphsBuilders.verkey
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import Digraph = GraphsAPI.Digraph
import Vertex = GraphsAPI.Vertex

function edgeToString<V>(edge: [Vertex<V>, Vertex<V>]): string {
    return edge[0].key + '->' + edge[1].key
}

describe('Digraph', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)

    describe('DG API', () => {
        let dg: Digraph<number>
        let dgWithEdge: Digraph<number>
        const a = vertex('A', 1)
        const b = vertex('B', 2)
        const c = vertex('C', 3)

        beforeEach(() => {
            dg = digraph()
            dgWithEdge = digraph<number>().addEdge(a, b)
                .addEdge(b, c)
                .addEdge(c, a)
                .addEdge(a, a)
        })

        it('should add vertex with the same key only one time', () => {
            dg.addVertex(a)
                .addVertex(a)
            expect(dg.v()).toBe(1)
            dg.asVerticesCollection().forEach(v => expect(v.value).toBe(1))
        })

        it('should add vertices with different keys', () => {
            dg.addVertex(a)
                .addVertex(b)
            expect(dg.v()).toBe(2)
            const keys = dg.asVerticesCollection().reduce((acc: string[], v) => [...acc, v.key], [])
            expect(keys).toHaveLength(2)
            expect(keys).toContain('A')
            expect(keys).toContain('B')
        })

        it('should add edges for existing vertices', () => {
            dg.addVertex(a)
                .addVertex(b)
            expect(dg.e()).toBe(0)

            dg.addEdge(a, b)
            expect(dg.e()).toBe(1)
            expect(dg.adjacent(b).size()).toBe(0)
            expect(dg.adjacent(a).size()).toBe(1)
            expect(dg.adjacent(a).reduce((acc: string[], v) => [...acc, v.key], [])).toContain('B')
        })

        it('should add edges for new vertices', () => {
            dg.addEdge(a, b)
            expect(dg.v()).toBe(2)
            expect(dg.e()).toBe(1)
            expect(dg.adjacent(a).size()).toBe(1)
            expect(dg.adjacent(a).reduce((acc: string[], v) => [...acc, v.key], [])).toContain('B')
            expect(dg.adjacent(b).size()).toBe(0)

            dg.addEdge(b, c)
            expect(dg.v()).toBe(3)
            expect(dg.e()).toBe(2)
            expect(dg.adjacent(a).size()).toBe(1)
            expect(dg.adjacent(a).reduce((acc: string[], v) => [...acc, v.key], [])).toContain('B')
            expect(dg.adjacent(b).size()).toBe(1)
            expect(dg.adjacent(b).reduce((acc: string[], v) => [...acc, v.key], [])).toContain('C')
            expect(dg.adjacent(c).size()).toBe(0)
        })

        it('should return number of vertices and edges', () => {
            expect(dg.v()).toBe(0)
            expect(dg.e()).toBe(0)

            expect(dgWithEdge.v()).toBe(3)
            expect(dgWithEdge.e()).toBe(4)
        })

        it('should print his state in readable format', () => {
            expect(dgWithEdge.toString()).toBe('3 vertices, 4 edges \n' +
                'A: B A\n' +
                'B: C\n' +
                'C: A\n')
        })

        it('should correctly build DG from tinyDG data', () => {
            const dg = digraphFromEdgesKeys(tinyDG)
            const expected = '13 vertices, 22 edges \n' +
                '0: 1 5\n' +
                '1:\n' +
                '2: 3 0\n' +
                '3: 2 5\n' +
                '4: 2 3\n' +
                '5: 4\n' +
                '6: 0 8 4 9\n' +
                '7: 9 6\n' +
                '8: 6\n' +
                '9: 10 11\n' +
                '10: 12\n' +
                '11: 12 4\n' +
                '12: 9\n'
            expect(dg.toString()).toBe(expected)
        })

        describe('asVerticesCollection', () => {
            it('should return zero empty DG', () => {
                expect(dg.asVerticesCollection().size()).toBe(0)
            })
            it('should return amount of vertices', () => {
                dg.addVertex(a).addVertex(b).addVertex(c)
                expect(dg.asVerticesCollection().size()).toBe(3)
            })
        })
        describe('asEdgesCollection', () => {
            it('should return empty collection for empty DG', () => {
                expect(dg.asEdgesCollection().size()).toBe(0)
            })
            it('should return empty collection for DG without edges', () => {
                expect(dg.asEdgesCollection().size())
            })
            it('should return all edges for DG that have some', () => {
                expect(dgWithEdge.asEdgesCollection().size()).toBe(4)
                const edges = dgWithEdge.asEdgesCollection().reduce((acc, p) =>
                    acc === '' ? edgeToString(p) : acc + ' ' + edgeToString(p), '')
                expect(edges).toBe('A->B A->A B->C C->A')
            })
            describe('Collection of edges', () => {
                describe('map', () => {
                    it('should return empty container for empty DG', () => {
                        expect(dg.asEdgesCollection().map(_ => { throw new Error() }).size()).toBe(0)
                    })
                    it('should transform every item', () => {
                        const mapped = dgWithEdge.asEdgesCollection().map(p => edgeToString(p))
                        expect(mapped.size()).toBe(4)
                        expect(mapped.reduce((acc, item) => acc + item, '')).toBe('A->BA->AB->CC->A')
                    })
                })
                describe('filter', () => {
                    it('should return empty container for empty DG', () => {
                        expect(dg.asEdgesCollection().filter(_ => { throw new Error() }).size()).toBe(0)
                    })
                    it('should return empty container if all edges are filtered', () => {
                        expect(dgWithEdge.asEdgesCollection().filter(p => p[0].key === 'no_key').size()).toBe(0)
                    })
                    it('should return container whithout filtered edges', () => {
                        const actual = dgWithEdge.asEdgesCollection()
                            .filter(p => p[0].key !== 'A' && p[1].key !== 'A')
                            .reduce((acc, p) => acc + edgeToString(p), '')
                        expect(actual).toBe('B->C')
                    })
                })
                describe('forEach', () => {
                    it('should not invoke HOF for empty DG', () => {
                        dg.asEdgesCollection().forEach(_ => { throw new Error() })
                    })
                    it('should invoke HOF for all edges', () => {
                        let result = ''
                        dgWithEdge.asEdgesCollection().forEach(p => result += edgeToString(p))
                        expect(result).toBe('A->BA->AB->CC->A')
                    })
                })
                describe('reduce', () => {
                    it('should not invoke HOF for empty DG', () => {
                        expect(dg.asEdgesCollection().reduce(() => { throw new Error() }, 'empty')).toBe('empty')
                    })
                    it('should invoke HOF for all edges', () => {
                        expect(dgWithEdge.asEdgesCollection()
                            .reduce((acc, p) => acc + edgeToString(p), ''))
                            .toBe('A->BA->AB->CC->A')
                    })
                })
                describe('size', () => {
                    it('should return zero empty DG', () => {
                        expect(dg.asEdgesCollection().size()).toBe(0)
                    })
                    it('should return amount of vertices', () => {
                        expect(dgWithEdge.asEdgesCollection().size()).toBe(4)
                    })
                })
            })
        })
        describe('outdegree', () => {
            it('should correctly return outdegrees for existing vertices', () => {
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
            it('should return zero for non-existing vertices', () => {
                expect(tiny.outdegree(verkey('13'))).toBe(0)
            })
        })
        describe('indegree', () => {
            it('should correctly return indegrees for existing vertices', () => {
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
            it('should return zero for non-existing vertices', () => {
                expect(tiny.indegree(verkey('13'))).toBe(0)
            })
        })
    })

    describe('DG as a Container', () => {
        const empty = digraph<string>()

        describe('map', () => {
            it('should return empty container for empty DG', () => {
                expect(empty.asVerticesCollection().map(_ => { throw new Error() }).size()).toBe(0)
            })
            it('should transform every item', () => {
                const mapped = tiny.asVerticesCollection().map(v => parseInt(v.value, 10))
                expect(mapped.size()).toBe(13)
                expect(mapped.reduce((acc, item) => acc + item, 0)).toBe(78)
            })
        })
        describe('filter', () => {
            it('should return empty container for empty DG', () => {
                expect(empty.asVerticesCollection().filter(_ => { throw new Error() }).size()).toBe(0)
            })
            it('should return empty container if all vertices are filtered', () => {
                expect(tiny.asVerticesCollection().filter(v => v.key === 'no_key').size()).toBe(0)
            })
            it('should return container whithout filtered vertices', () => {
                const actual = tiny
                    .asVerticesCollection().filter(v => parseInt(v.key, 10) < 7)
                    .reduce((acc, v) => acc + parseInt(v.key, 10), 0)
                expect(actual).toBe(21)
            })
        })
        describe('forEach', () => {
            it('should not invoke HOF for empty DG', () => {
                empty.asVerticesCollection().forEach(_ => { throw new Error() })
            })
            it('should invoke HOF for all vertices', () => {
                let result = 0
                tiny.asVerticesCollection().forEach(v => result += parseInt(v.key, 10))
                expect(result).toBe(78)
            })
        })
        describe('reduce', () => {
            it('should not invoke HOF for empty DG', () => {
                expect(empty.asVerticesCollection().reduce(() => { throw new Error() }, 'empty')).toBe('empty')
            })
            it('should invoke HOF for all vertices', () => {
                expect(tiny.asVerticesCollection().reduce((acc, v) => acc + parseInt(v.key, 10), 0)).toBe(78)
            })
        })
        describe('size', () => {
            it('should return zero empty DG', () => {
                expect(empty.asVerticesCollection().size()).toBe(0)
            })
            it('should return amount of vertices', () => {
                expect(tiny.asVerticesCollection().size()).toBe(13)
            })
        })
    })
})
