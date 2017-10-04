import { GraphsAPI } from './api'
import Vertex = GraphsAPI.Vertex

export interface IndexedByString<T> {
    [index: string]: T
}

export function isMarked<V>(v: Vertex<V>, marked: IndexedByString<boolean>): boolean {
    return marked[v.key] !== undefined && marked[v.key] === true
}
