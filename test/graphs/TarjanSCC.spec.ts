import { TarjanSCC } from '../../src/graphs/TarjanSCC'
import { testScc } from '../utils/SccTestHelper'

describe('TarjanSCC', () => {
    testScc(dg => new TarjanSCC(dg))
})
