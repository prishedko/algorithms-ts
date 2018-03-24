import {TarjanSCC} from '../../../src/graphs/directed/TarjanSCC'
import {testScc} from '../../utils/SccTestHelper'

describe('TarjanSCC', () => {
    testScc(dg => new TarjanSCC(dg))
})
