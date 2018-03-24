import {CommonGraphBuilders, DigraphBuilders} from '../../../src'
import {AdjacencyListDigraph} from '../../../src/graphs/directed/AdjacencyListDigraph'
import {tinyDG} from '../../data/tinyDG'
import {QueueDirectedCycle} from '../../../src/graphs/directed/QueueDirectedCycle'
import {BreadthFirstDirectedPaths} from '../../../src/graphs/directed/BreadthFirstDirectedPaths'
import {DepthFirstDirectedPaths} from '../../../src/graphs/directed/DepthFirstDirectedPaths'
import {DigraphBFS} from '../../../src/graphs/directed/DigraphBFS'
import {DigraphDFS} from '../../../src/graphs/directed/DigraphDFS'
import {DepthFirstOrderDFS} from '../../../src/graphs/directed/DepthFirstOrderDFS'
import {DirectedEulerianCycleDFS} from '../../../src/graphs/directed/DirectedEulerianCycleDFS'
import {TopologicalOrderDFS} from '../../../src/graphs/directed/TopologicalOrderDFS'
import {DirectedEulerianPathDFS} from '../../../src/graphs/directed/DirectedEulerianPathDFS'
import {GabowSCC} from '../../../src/graphs/directed/GabowSCC'
import {KosarajuSharirSCC} from '../../../src/graphs/directed/KosarajuSharirSCC'
import {TarjanSCC} from '../../../src/graphs/directed/TarjanSCC'
import {CommonsBuilder} from '../../../src'
import {DirectedDFS} from '../../../src/graphs/directed/DirectedDFS'
import {TransitiveClosureDFS} from '../../../src/graphs/directed/TransitiveClosureDFS'

import collectionFromArray = CommonsBuilder.collectionFromArray

describe('GraphsBuilders', () => {
    const tiny = DigraphBuilders.digraphFromEdgesKeys(tinyDG)

    it('should create correct implementations', () => {
        expect(DigraphBuilders.digraph() instanceof AdjacencyListDigraph).toBe(true)

        const twoVerticesDG = DigraphBuilders.digraphFromEdges<string>([[
            CommonGraphBuilders.verkey('0'),
            CommonGraphBuilders.verkey('1')
        ]])
        expect(twoVerticesDG instanceof AdjacencyListDigraph).toBe(true)
        expect(twoVerticesDG.v()).toBe(2)
        expect(twoVerticesDG.e()).toBe(1)

        const vtx1 = CommonGraphBuilders.vertex('1', '2')
        expect(vtx1.key).toBe('1')
        expect(vtx1.value).toBe('2')

        const vtx2 = CommonGraphBuilders.verkey('0')
        expect(vtx2.key).toBe('0')
        expect(vtx2.value).toBe('0')

        expect(DigraphBuilders.directedCycle(tiny) instanceof QueueDirectedCycle).toBe(true)
        expect(DigraphBuilders.directedPathsBFS(tiny, vtx2) instanceof BreadthFirstDirectedPaths).toBe(true)
        expect(DigraphBuilders.directedPathsDFS(tiny, vtx2) instanceof DepthFirstDirectedPaths).toBe(true)
        expect(DigraphBuilders.digraphBFS() instanceof DigraphBFS).toBe(true)
        expect(DigraphBuilders.digraphDFS() instanceof DigraphDFS).toBe(true)
        expect(DigraphBuilders.depthFirstOrder(tiny) instanceof DepthFirstOrderDFS).toBe(true)
        expect(DigraphBuilders.directedEulerianCycle(tiny) instanceof DirectedEulerianCycleDFS).toBe(true)
        expect(DigraphBuilders.topologicalOrder(tiny) instanceof TopologicalOrderDFS).toBe(true)
        expect(DigraphBuilders.directedEulerianPath(tiny) instanceof DirectedEulerianPathDFS).toBe(true)
        expect(DigraphBuilders.sccGabow(tiny) instanceof GabowSCC).toBe(true)
        expect(DigraphBuilders.sccKosarajuSharir(tiny) instanceof KosarajuSharirSCC).toBe(true)
        expect(DigraphBuilders.sccTarjan(tiny) instanceof TarjanSCC).toBe(true)
        expect(DigraphBuilders.directed(tiny, collectionFromArray([vtx2])) instanceof DirectedDFS).toBe(true)
        expect(DigraphBuilders.transitiveClosure(tiny) instanceof TransitiveClosureDFS).toBe(true)
    })
})
