import { GabowSCC } from '../../src/graphs/GabowSCC'
import { testScc } from '../utils/SccTestHelper'

describe('GabowSCC', () => {
    testScc(dg => new GabowSCC(dg))
})
