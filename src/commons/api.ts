/**
 * This namespace defines commonly used ADTs.
 */
export namespace CommonsAPI {
    /**
     * Defines abstract contract for collection with elements that allows iterations and transformations. Be aware that
     * there is no any method for mutating container's content, so it is preferable that all high order functions that
     * are passed into methods of the container are implemented as pure functions.
     */
    export interface Collection<E> {
        /**
         * Transforms every element of this container and returns new container with transformed elements. Returns
         * empty container if this container is empty.
         * @param {(e: E) => T} f transformation function.
         * @return {CommonsAPI.Collection<T>} new container with transformed elements.
         */
        map<T>(f: (e: E) => T): Collection<T>
        /**
         * Filters elements of this container. Returns empty container if the predicates filters all elements in this
         * container.
         * @param {(e: E) => boolean} p filter predicate.
         * @return {CommonsAPI.Collection<E>} new container with elements for which p(element) === true.
         */
        filter(p: (e: E) => boolean): Collection<E>
        /**
         * Executes given function for each element in this container.
         * @param {(e: E) => void} f function to apply to each element.
         */
        forEach(f: (e: E) => void): void
        /**
         * Reduces content of this container to some another type's instance.
         * @param {(accumulator: A, currentElement: E) => A} r reducer.
         * @param {A} initialValue initial value of accumulator.
         * @return {A} result of reducing.
         */
        reduce<A>(r: (accumulator: A, currentElement: E) => A, initialValue: A): A
        /**
         * Returns amount of elements in this container.
         * @return {number} amount of elements in this container.
         */
        size(): number
        /**
         * Returns the value of the first element in the array that satisfies the provided predicate. Otherwise
         * undefined is returned.
         * @param {(e: E) => boolean} p predicate to check elements.
         * @return {E} first found element or undefined.
         */
        find(p: (e: E) => boolean): E | undefined
        /**
         * Tests whether all elements in the array pass the given predicate.
         * @param {(e: E) => boolean} p predicate to check elements.
         * @return {boolean} <code>true</code> if for every element the predicate returns <code>true</code>.
         */
        every(p: (e: E) => boolean): boolean
        /**
         * Checks whether there is an element that passes given predicate.
         * @param {(e: E) => boolean} p predicate to check elements.
         * @return {boolean} <code>true</code> if there is an element for which the predicate returns <code>true</code>.
         */
        some(p: (e: E) => boolean): boolean
        /**
         * Returns new <tt>CollectionIterator</tt> to iterate over <code>this</code> collection.
         * @return {CommonsAPI.CollectionIterator<E>} new instance of iterator for <code>this</code> collection.
         */
        iterator(): CollectionIterator<E>
    }
    /**
     * An iterator over a collection.
     */
    export interface CollectionIterator<E> {
        /**
         * Returns <code>true</code> if the iteration has more elements. (In other words, returns <code>true</code> if
         * <code>next()</code> would return an element rather than throwing an error.)
         * @return {boolean} <code>true</code> if the iteration has more elements
         */
        hasNext(): boolean
        /**
         * Returns the next element in the iteration.
         * @return {E} the next element in the iteration.
         * @throws {Error('No such element')} if the iteration has no more elements
         */
        next(): E
        /**
         * Executes the given function for each remaining element until all elements have been processed or the function
         * throws an error. Function is applied in the order of iteration, if that order is specified.
         * @param {(e: E) => void} f function to apply to each remaining element.
         */
        forEachRemaining(f: (e: E) => void): void
    }
    /**
     * Defines result of comparison of
     */
    export enum Ordering {
        /** Lesser than */
        LT = -1,
        /** Equal */
        EQ = 0,
        /** Greater than */
        GT = 1
    }
    /**
     * A comparison function, which imposes a <i>total ordering</i> on some collection of objects. Compares its two
     * arguments for order. Returns a LT, EQ, or GT as the first argument is less than, equal to, or greater than the
     * second.
     *
     * @param <T> the type of objects that may be compared by this comparator
     */
    export type Comparator<T> = (left: T, right: T) => Ordering
}
