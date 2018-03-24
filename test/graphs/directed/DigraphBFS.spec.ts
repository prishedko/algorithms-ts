import {CommonGraphAPI, CommonGraphBuilders, DigraphBuilders} from '../../../src'
import {tinyDG} from '../../data/tinyDG'
import {DigraphBFS} from '../../../src/graphs/directed/DigraphBFS'

import Vertex = CommonGraphAPI.Vertex
import verkey = CommonGraphBuilders.verkey
import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys

let path = ''

function visit(v: Vertex<string>): void {
    path = path === '' ? v.key : path + '-' + v.key
}

describe('DigraphBFS', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)

    it('should visit all vertices that are reachable from the given one', () => {
        const bfs = new DigraphBFS<string>()

        path = ''
        bfs.search(tiny, verkey('0'), visit)
        expect(path).toBe('0-1-5-4-2-3')

        path = ''
        bfs.search(tiny, verkey('1'), visit)
        expect(path).toBe('1')

        path = ''
        bfs.search(tiny, verkey('2'), visit)
        expect(path).toBe('2-3-0-5-1-4')

        path = ''
        bfs.search(tiny, verkey('3'), visit)
        expect(path).toBe('3-2-5-0-4-1')

        path = ''
        bfs.search(tiny, verkey('4'), visit)
        expect(path).toBe('4-2-3-0-5-1')

        path = ''
        bfs.search(tiny, verkey('5'), visit)
        expect(path).toBe('5-4-2-3-0-1')

        path = ''
        bfs.search(tiny, verkey('6'), visit)
        expect(path).toBe('6-0-8-4-9-1-5-2-3-10-11-12')

        path = ''
        bfs.search(tiny, verkey('7'), visit)
        expect(path).toBe('7-9-6-10-11-0-8-4-12-1-5-2-3')

        path = ''
        bfs.search(tiny, verkey('8'), visit)
        expect(path).toBe('8-6-0-4-9-1-5-2-3-10-11-12')

        path = ''
        bfs.search(tiny, verkey('9'), visit)
        expect(path).toBe('9-10-11-12-4-2-3-0-5-1')

        path = ''
        bfs.search(tiny, verkey('10'), visit)
        expect(path).toBe('10-12-9-11-4-2-3-0-5-1')

        path = ''
        bfs.search(tiny, verkey('11'), visit)
        expect(path).toBe('11-12-4-9-2-3-10-0-5-1')

        path = ''
        bfs.search(tiny, verkey('12'), visit)
        expect(path).toBe('12-9-10-11-4-2-3-0-5-1')
    })
})
