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
    }
}
