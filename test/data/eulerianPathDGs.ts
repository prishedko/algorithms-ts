export namespace eulerianPath {
    /**
     * Test digraph with the following structure:
     * <pre>
     *     4 vertices, 5 edges
     *         0: 1
     *         1: 2
     *         2: 3 0
     *         3: 1
     * </pre>
     */
    export const first: [string, string][] = [
        ['0', '1'],
        ['1', '2'],
        ['2', '3'],
        ['2', '0'],
        ['3', '1']
    ]
}
