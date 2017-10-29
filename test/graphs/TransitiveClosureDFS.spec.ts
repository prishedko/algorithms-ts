import { tinyDG } from '../data/tinyDG'
import { GraphsBuilders } from '../../src'
import { TransitiveClosureDFS } from '../../src/graphs/TransitiveClosureDFS'

import verkey = GraphsBuilders.verkey
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys

const T: boolean = true
const F: boolean = false

describe('TransitiveClosureDFS', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)
    const expected = [
      // 0  1  2  3  4  5  6  7  8  9  10 11 12
        [T, T, T, T, T, T, F, F, F, F, F, F, F], //  0
        [F, T, F, F, F, F, F, F, F, F, F, F, F], //  1
        [T, T, T, T, T, T, F, F, F, F, F, F, F], //  2
        [T, T, T, T, T, T, F, F, F, F, F, F, F], //  3
        [T, T, T, T, T, T, F, F, F, F, F, F, F], //  4
        [T, T, T, T, T, T, F, F, F, F, F, F, F], //  5
        [T, T, T, T, T, T, T, F, T, T, T, T, T], //  6
        [T, T, T, T, T, T, T, T, T, T, T, T, T], //  7
        [T, T, T, T, T, T, T, F, T, T, T, T, T], //  8
        [T, T, T, T, T, T, F, F, F, T, T, T, T], //  9
        [T, T, T, T, T, T, F, F, F, T, T, T, T], // 10
        [T, T, T, T, T, T, F, F, F, T, T, T, T], // 11
        [T, T, T, T, T, T, F, F, F, T, T, T, T]  // 12
    ]

    it('should check tinyDG', () => {
        const tc = new TransitiveClosureDFS(tiny);
        [...Array(13).keys()].forEach(vidx => {
            [...Array(13).keys()].forEach(widx => {
                expect(tc.reachable(verkey(String(vidx)), verkey(String(widx)))).toBe(expected[vidx][widx])
            })
        })
        tc.reachable(verkey('0'), verkey('A'))
        tc.reachable(verkey('A'), verkey('0'))
        tc.reachable(verkey('A'), verkey('B'))
    })
})
