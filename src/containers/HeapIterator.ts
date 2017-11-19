import {AbstractIterator} from '../commons/AbstractIterator'
import {ContainersAPI} from './api'

import Queue = ContainersAPI.Queue

export class HeapIterator<E> extends AbstractIterator<E> {
    constructor(pq: E[], n: number, private copy: Queue<E>) {
        super()
        for (let i = 1; i <= n; i++) {
            copy.enqueue(pq[i])
        }
    }

    hasNext(): boolean {
        return !this.copy.isEmpty()
    }

    next(): E {
        if (!this.hasNext()) {
            throw new Error('No such element')
        }
        return this.copy.dequeue()
    }

}
