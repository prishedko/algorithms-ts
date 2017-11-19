import { CommonsAPI } from './api'
import { ArrayCollection } from './ArrayCollection'
import Collection = CommonsAPI.Collection

/**
 * Contains factory functions for creating instances of commonly used ADTs.
 */
export namespace CommonsBuilder {
    import Comparator = CommonsAPI.Comparator
    import Ordering = CommonsAPI.Ordering

    /**
     * Creates new instance of empty <tt>Collection</tt>.
     * @return {CommonsAPI.Collection<E>} new instance of empty <tt>Collection</tt>.
     */
    export function emptyCollection<E>(): Collection<E> {
        return new ArrayCollection()
    }

    /**
     * Creates new instance of <tt>Collection</tt> that contains all items from the given array. The instance doesn't
     * depends on underlying array, IOW changes in the array won't affect the container.
     * @param {E[]} array array to copy items from.
     * @param {boolean} copyArray defines either elements from given array will be copied into the result collection or
     *     given array will be reused by the collection. Be aware that in the second case changes in the array mean
     *     changes in the collection. By default it copies the array.
     * @return {CommonsAPI.Collection<E>} new instance of <tt>Collection</tt>.
     */
    export function collectionFromArray<E>(array: E[], copyArray: boolean = true): Collection<E> {
        return new ArrayCollection(array, copyArray)
    }

    /**
     * Compares two numbers. Uses default comparison operators.
     */
    export const numberComparator: Comparator<number> = (left: number, right: number) => {
        if (left < right) {
            return Ordering.LT
        } else if (left > right) {
            return Ordering.GT
        } else {
            return Ordering.EQ
        }
    }

    /**
     * Compares two numbers. Uses default lexicographical string comparison.
     */
    export const stringComparator: Comparator<string> = (left: string, right: string) => {
        if (left < right) {
            return Ordering.LT
        } else if (left > right) {
            return Ordering.GT
        } else {
            return Ordering.EQ
        }
    }
}
