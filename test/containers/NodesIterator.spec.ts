import { NodesIterator, Node } from '../../src/containers/AuxiliaryTypes'
import { testNextAndHasNext, testForEachRemaining } from '../utils/IteratorTestHelper'

describe('NodesIterator', () => {
    const array = [2, 1, 3, 5, 4]
    const nodes: Node<number> = {
        element: 2,
        next: {
            element: 1,
            next: {
                element: 3,
                next: {
                    element: 5,
                    next: {
                        element: 4,
                        next: undefined
                    }
                }
            }
        }
    }
    it('should correctly implement next() and hasNext()', () => {
        testNextAndHasNext(new NodesIterator(undefined), new NodesIterator(nodes), array)
    })

    it('should correctly implement forEachRemaining()', () => {
        testForEachRemaining(new NodesIterator(undefined), new NodesIterator(nodes), [3, 5, 4])
    })
})
