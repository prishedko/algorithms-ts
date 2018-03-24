import {KosarajuSharirSCC} from '../../../src/graphs/directed/KosarajuSharirSCC'
import {testScc} from '../../utils/SccTestHelper'

describe('KosarajuSharirSCC', () => {
    testScc(dg => new KosarajuSharirSCC(dg))
})
