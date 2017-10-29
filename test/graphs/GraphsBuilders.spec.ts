import { GraphsBuilders as gb } from '../../src'
import { AdjacencyListDigraph } from '../../src/graphs/AdjacencyListDigraph'
import { tinyDG } from '../data/tinyDG'
import { QueueDirectedCycle } from '../../src/graphs/QueueDirectedCycle'
import { BreadthFirstDirectedPaths } from '../../src/graphs/BreadthFirstDirectedPaths'
import { DepthFirstDirectedPaths } from '../../src/graphs/DepthFirstDirectedPaths'
import { DigraphBFS } from '../../src/graphs/DigraphBFS'
import { DigraphDFS } from '../../src/graphs/DigraphDFS'
import { DepthFirstOrderDFS } from '../../src/graphs/DepthFirstOrderDFS'
import { DirectedEulerianCycleDFS } from '../../src/graphs/DirectedEulerianCycleDFS'
import { TopologicalOrderDFS } from '../../src/graphs/TopologicalOrderDFS'
import { DirectedEulerianPathDFS } from '../../src/graphs/DirectedEulerianPathDFS'
import { GabowSCC } from '../../src/graphs/GabowSCC'
import { KosarajuSharirSCC } from '../../src/graphs/KosarajuSharirSCC'
import { TarjanSCC } from '../../src/graphs/TarjanSCC'
import { CommonsBuilder } from '../../src/commons/builders'
import { DirectedDFS } from '../../src/graphs/DirectedDFS'
import { TransitiveClosureDFS } from '../../src/graphs/TransitiveClosureDFS'

import collectionFromArray = CommonsBuilder.collectionFromArray

describe('GraphsBuilders', () => {
    const tiny = gb.digraphFromEdgesKeys(tinyDG)

    it('should create correct implementations', () => {
        expect(gb.digraph() instanceof AdjacencyListDigraph).toBe(true)

        const twoVerticesDG = gb.digraphFromEdges<string>([[gb.verkey('0'), gb.verkey('1')]])
        expect(twoVerticesDG instanceof AdjacencyListDigraph).toBe(true)
        expect(twoVerticesDG.v()).toBe(2)
        expect(twoVerticesDG.e()).toBe(1)

        const vtx1 = gb.vertex('1', '2')
        expect(vtx1.key).toBe('1')
        expect(vtx1.value).toBe('2')

        const vtx2 = gb.verkey('0')
        expect(vtx2.key).toBe('0')
        expect(vtx2.value).toBe('0')

        expect(gb.directedCycle(tiny) instanceof QueueDirectedCycle).toBe(true)
        expect(gb.directedPathsBFS(tiny, vtx2) instanceof BreadthFirstDirectedPaths).toBe(true)
        expect(gb.directedPathsDFS(tiny, vtx2) instanceof DepthFirstDirectedPaths).toBe(true)
        expect(gb.digraphBFS() instanceof DigraphBFS).toBe(true)
        expect(gb.digraphDFS() instanceof DigraphDFS).toBe(true)
        expect(gb.depthFirstOrder(tiny) instanceof DepthFirstOrderDFS).toBe(true)
        expect(gb.directedEulerianCycle(tiny) instanceof DirectedEulerianCycleDFS).toBe(true)
        expect(gb.topologicalOrder(tiny) instanceof TopologicalOrderDFS).toBe(true)
        expect(gb.directedEulerianPath(tiny) instanceof DirectedEulerianPathDFS).toBe(true)
        expect(gb.sccGabow(tiny) instanceof GabowSCC).toBe(true)
        expect(gb.sccKosarajuSharir(tiny) instanceof KosarajuSharirSCC).toBe(true)
        expect(gb.sccTarjan(tiny) instanceof TarjanSCC).toBe(true)
        expect(gb.directed(tiny, collectionFromArray([vtx2])) instanceof DirectedDFS).toBe(true)
        expect(gb.transitiveClosure(tiny) instanceof TransitiveClosureDFS).toBe(true)
    })
})
