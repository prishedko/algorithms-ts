import { CommonsBuilder } from '../../src/'
import emptyCollection = CommonsBuilder.emptyCollection
import collectionFromArray = CommonsBuilder.collectionFromArray

describe('Container', () => {
    describe('empty container methods', () => {
        const container = emptyCollection<string>()

        it('should ignore HOF and return empty container', () => {
            expect(container.map(_ => { throw new Error() }).size()).toBe(0)
            expect(container.filter(_ => { throw new Error() }).size()).toBe(0)
            container.forEach(_ => { throw new Error() })
            expect(container.reduce(() => { throw new Error() }, 'empty')).toBe('empty')
            expect(container.size()).toBe(0)
        })
    })

    describe('non-empty container', () => {
        const container = collectionFromArray([1, 2, 3])

        describe('map', () => {
            it('should transform all elements', () => {
                const result: string[] = container
                    .map(e => String(e))
                    .reduce((acc: string[], item) => [...acc, item], [])
                expect(result).toEqual(['1', '2', '3'])
            })
        })
        describe('filter', () => {
            it('should return container with non-filtered elements', () => {
                const result: number[] = container
                    .filter(e => e >= 2)
                    .reduce((acc: number[], item) => [...acc, item], [])
                expect(result).toEqual([2, 3])
            })
            it('should return empty container if all elements have been filtered', () => {
                const result: number[] = container
                    .filter(e => e >= 4)
                    .reduce((acc: number[], item) => [...acc, item], [])
                expect(result).toEqual([])
            })
        })
        describe('forEach', () => {
            it('should process all elements', () => {
                let counter = 0
                container.forEach(e => counter += e)
                expect(counter).toBe(6)
            })
        })
        describe('reduce', () => {
            it('should process all elements', () => {
                expect(container.reduce((acc, item) => acc + item, 0)).toBe(6)
            })
        })
        describe('size', () => {
            it('should correctly return number of elements', () => {
                let c = emptyCollection()
                expect(c.size()).toBe(0)
                c = collectionFromArray([1])
                expect(c.size()).toBe(1)
                c = collectionFromArray([1, 3, 5])
                expect(c.size()).toBe(3)
            })
        })
    })
})
