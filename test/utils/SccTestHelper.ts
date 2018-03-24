import {CommonGraphBuilders, DigraphBuilders, DigraphAPI} from '../../src'
import {tinyDG} from '../data/tinyDG'
import {sccDG} from '../data/sccDG'

import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys
import verkey = CommonGraphBuilders.verkey
import Digraph = DigraphAPI.Digraph
import StronglyConnectedComponents = DigraphAPI.StronglyConnectedComponents

export function testScc(sccBuilder: (dg: Digraph<string>) => StronglyConnectedComponents<string>): void {
    describe('SCC tests', () => {
        it('should find SCCs in tinyDG', () => {
            const dg = digraphFromEdgesKeys(tinyDG)
            const scc = sccBuilder(dg)
            expect(scc.count()).toBe(5)

            expect(scc.id(verkey('0'))).toBe(1)
            expect(scc.id(verkey('1'))).toBe(0)
            expect(scc.id(verkey('2'))).toBe(1)
            expect(scc.id(verkey('3'))).toBe(1)
            expect(scc.id(verkey('4'))).toBe(1)
            expect(scc.id(verkey('5'))).toBe(1)
            expect(scc.id(verkey('6'))).toBe(3)
            expect(scc.id(verkey('7'))).toBe(4)
            expect(scc.id(verkey('8'))).toBe(3)
            expect(scc.id(verkey('9'))).toBe(2)
            expect(scc.id(verkey('10'))).toBe(2)
            expect(scc.id(verkey('11'))).toBe(2)
            expect(scc.id(verkey('12'))).toBe(2)

            expect(scc.stronglyConnected(verkey('1'), verkey('0'))).toBe(false)
            expect(scc.stronglyConnected(verkey('1'), verkey('A'))).toBe(false)
            expect(scc.stronglyConnected(verkey('0'), verkey('2'))).toBe(true)
            expect(scc.stronglyConnected(verkey('6'), verkey('8'))).toBe(true)
            expect(scc.stronglyConnected(verkey('9'), verkey('12'))).toBe(true)
        })
        it('should find SCCs in sccDG', () => {
            const dg = digraphFromEdgesKeys(sccDG)
            const scc = sccBuilder(dg)
            expect(scc.count()).toBe(3)
            expect(scc.id(verkey('0'))).toBe(2)
            expect(scc.id(verkey('1'))).toBe(2)
            expect(scc.id(verkey('2'))).toBe(1)
            expect(scc.id(verkey('3'))).toBe(1)
            expect(scc.id(verkey('4'))).toBe(2)
            expect(scc.id(verkey('5'))).toBe(0)
            expect(scc.id(verkey('6'))).toBe(0)
            expect(scc.id(verkey('7'))).toBe(1)

            expect(scc.stronglyConnected(verkey('0'), verkey('5'))).toBe(false)
            expect(scc.stronglyConnected(verkey('7'), verkey('6'))).toBe(false)
            expect(scc.stronglyConnected(verkey('A'), verkey('B'))).toBe(false)
            expect(scc.stronglyConnected(verkey('0'), verkey('4'))).toBe(true)
            expect(scc.stronglyConnected(verkey('2'), verkey('7'))).toBe(true)
            expect(scc.stronglyConnected(verkey('6'), verkey('5'))).toBe(true)
        })
    })
}
