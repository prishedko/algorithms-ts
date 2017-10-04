export type Node<E> = undefined | {
    element: E
    next: Node<E>
}

export class NodesIterator<E> {
    constructor(private current: Node<E>) {}

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
