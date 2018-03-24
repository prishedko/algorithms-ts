import {tinyDG} from '../../data/tinyDG'
import {CommonGraphBuilders, DigraphBuilders, CommonsBuilder} from '../../../src'
import {DirectedDFS} from '../../../src/graphs/directed/DirectedDFS'

import verkey = CommonGraphBuilders.verkey
import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys
import collectionFromArray = CommonsBuilder.collectionFromArray

describe('DirectedDFS', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)

    it('should check reachability from vertex "1"', () => {
        const dir = new DirectedDFS(tiny, collectionFromArray([verkey('1')]))
        expect(dir.count()).toBe(1);
        [...Array(13).keys()].map(value => verkey(String(value))).forEach(vertex => {
            if (vertex.key === '1') {
                expect(dir.marked(vertex)).toBe(true)
            } else {
                expect(dir.marked(vertex)).toBe(false)
            }
        })
    })
    it('should check reachability from vertex "2"', () => {
        const dir = new DirectedDFS(tiny, collectionFromArray([verkey('2')]))
        expect(dir.count()).toBe(6);
        [...Array(13).keys()].map(value => verkey(String(value))).forEach(vertex => {
            if (vertex.key in ['0', '1', '2', '3', '4', '5']) {
                expect(dir.marked(vertex)).toBe(true)
            } else {
                expect(dir.marked(vertex)).toBe(false)
            }
        })
    })
    it('should check reachability from vertex "1 2 6"', () => {
        const dir = new DirectedDFS(tiny, collectionFromArray(['1', '2', '6'].map(v => verkey(v))))
        expect(dir.count()).toBe(12);
        [...Array(13).keys()].map(value => verkey(String(value))).forEach(vertex => {
            if (vertex.key === '7') {
                expect(dir.marked(vertex)).toBe(false)
            } else {
                expect(dir.marked(vertex)).toBe(true)
            }
        })
    })
})
