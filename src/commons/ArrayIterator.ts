import { AbstractIterator } from './AbstractIterator'

export class ArrayIterator<E> extends AbstractIterator<E> {
    private cursor = 0       // index of next element to return
    private lastRet = -1     // index of last element returned; -1 if no such

    constructor(private array: E[]) {
        super()
    }

    hasNext(): boolean {
        return this.cursor !== this.array.length
    }

    next(): E {
        const i = this.cursor
        if (i >= this.array.length) {
            throw new Error('No such element')
        }
        this.cursor = i + 1
        this.lastRet = i
        return this.array[this.lastRet]
    }
}
