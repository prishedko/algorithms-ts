import { AbstractIterator } from '../commons/AbstractIterator'

export type Node<E> = undefined | {
    element: E
    next: Node<E>
}

export class NodesIterator<E> extends AbstractIterator<E> {
    constructor(private current: Node<E>) {
        super()
    }

    hasNext(): boolean {
        return !!this.current
    }

    next(): E {
        if (!this.hasNext()) {
            throw new Error('No such element')
        }
        const element = this.current!.element
        this.current = this.current!.next
        return element
    }
}
