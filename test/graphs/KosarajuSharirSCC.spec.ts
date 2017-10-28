import { KosarajuSharirSCC } from '../../src/graphs/KosarajuSharirSCC'
import { testScc } from '../utils/SccTestHelper'

describe('KosarajuSharirSCC', () => {
    testScc(dg => new KosarajuSharirSCC(dg))
})
