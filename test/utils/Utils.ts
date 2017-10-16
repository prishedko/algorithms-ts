export function justThrowError<E, T>(_: E): T {
    throw new Error('Should not be invoked')
}
