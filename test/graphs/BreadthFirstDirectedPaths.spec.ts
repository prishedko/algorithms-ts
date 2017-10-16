import { GraphsAPI, GraphsBuilders } from '../../src'
import { CommonsAPI } from '../../src/commons/api'
import { tinyDG } from './tinyDG'
import { BreadthFirstDirectedPaths } from '../../src/graphs/BreadthFirstDirectedPaths'

import Vertex = GraphsAPI.Vertex
import verkey = GraphsBuilders.verkey
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import Collection = CommonsAPI.Collection

function reducePath(path: Collection<Vertex<string>>): string {
    return path.reduce((acc, v) => acc === '' ? v.key : acc + '->' + v.key, '')
}

describe('BreadthFirstDirectedPaths', () => {
    const tiny = digraphFromEdgesKeys(tinyDG)

    it('should find all paths in tinyDG from vertex 3', () => {
        const dp = new BreadthFirstDirectedPaths<string>(tiny, verkey('3'))
        expect(dp.hasPathTo(verkey('0'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('0')))).toBe('3->2->0')

        expect(dp.hasPathTo(verkey('1'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('1')))).toBe('3->2->0->1')

        expect(dp.hasPathTo(verkey('2'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('2')))).toBe('3->2')

        expect(dp.hasPathTo(verkey('3'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('3')))).toBe('3')

        expect(dp.hasPathTo(verkey('4'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('4')))).toBe('3->5->4')

        expect(dp.hasPathTo(verkey('5'))).toBe(true)
        expect(reducePath(dp.pathTo(verkey('5')))).toBe('3->5')

        expect(dp.hasPathTo(verkey('6'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('6')))).toBe('')

        expect(dp.hasPathTo(verkey('7'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('7')))).toBe('')

        expect(dp.hasPathTo(verkey('8'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('8')))).toBe('')

        expect(dp.hasPathTo(verkey('9'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('9')))).toBe('')

        expect(dp.hasPathTo(verkey('10'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('10')))).toBe('')

        expect(dp.hasPathTo(verkey('11'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('11')))).toBe('')

        expect(dp.hasPathTo(verkey('12'))).toBe(false)
        expect(reducePath(dp.pathTo(verkey('12')))).toBe('')
    })
})
