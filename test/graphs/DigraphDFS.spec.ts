import { GraphsAPI, GraphsBuilders } from '../../src'
import { tinyDG } from '../data/tinyDG'
import { DigraphDFS } from '../../src/graphs/DigraphDFS'

import Vertex = GraphsAPI.Vertex
import verkey = GraphsBuilders.verkey
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys

let path = ''

function visit(v: Vertex<string>): void {
    path = path === '' ? v.key : path + '-' + v.key
}

describe('DigraphDFS', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)

    it('should visit all vertices that are reachable from the given one', () => {
        const bfs = new DigraphDFS<string>()

        path = ''
        bfs.search(tiny, verkey('0'), visit)
        expect(path).toBe('0-5-4-3-2-1')

        path = ''
        bfs.search(tiny, verkey('1'), visit)
        expect(path).toBe('1')

        path = ''
        bfs.search(tiny, verkey('2'), visit)
        expect(path).toBe('2-0-5-4-1-3')

        path = ''
        bfs.search(tiny, verkey('3'), visit)
        expect(path).toBe('3-5-4-2-0-1')

        path = ''
        bfs.search(tiny, verkey('4'), visit)
        expect(path).toBe('4-3-5-2-0-1')

        path = ''
        bfs.search(tiny, verkey('5'), visit)
        expect(path).toBe('5-4-3-2-0-1')

        path = ''
        bfs.search(tiny, verkey('6'), visit)
        expect(path).toBe('6-9-11-12-10-4-3-5-2-8-0-1')

        path = ''
        bfs.search(tiny, verkey('7'), visit)
        expect(path).toBe('7-6-4-3-5-2-8-0-1-9-11-12-10')

        path = ''
        bfs.search(tiny, verkey('8'), visit)
        expect(path).toBe('8-6-9-11-12-10-4-3-5-2-0-1')

        path = ''
        bfs.search(tiny, verkey('9'), visit)
        expect(path).toBe('9-11-4-3-5-2-0-1-12-10')

        path = ''
        bfs.search(tiny, verkey('10'), visit)
        expect(path).toBe('10-12-9-11-4-3-5-2-0-1')

        path = ''
        bfs.search(tiny, verkey('11'), visit)
        expect(path).toBe('11-4-3-5-2-0-1-12-9-10')

        path = ''
        bfs.search(tiny, verkey('12'), visit)
        expect(path).toBe('12-9-11-4-3-5-2-0-1-10')
    })
})
