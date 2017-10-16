import { CommonsAPI } from './api'

import CollectionIterator = CommonsAPI.CollectionIterator

export abstract class AbstractIterator<E> implements CollectionIterator<E> {
    abstract hasNext(): boolean

    abstract next(): E

    forEachRemaining(f: (e: E) => void): void {
        while (this.hasNext()) {
            f(this.next())
        }
    }
}
