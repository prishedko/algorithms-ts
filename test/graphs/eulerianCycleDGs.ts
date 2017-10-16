export namespace eulerianCycle {
    /**
     * Test digraph with the following structure:
     * <pre>
     *     5 vertices, 6 edges
     *       0: 2 3
     *       1: 0
     *       2: 1
     *       3: 4
     *       4: 0
     * </pre>
     */
    export const first: [string, string][] = [
        ['0', '2'],
        ['0', '3'],
        ['1', '0'],
        ['2', '1'],
        ['3', '4'],
        ['4', '0']
    ]
    /**
     * Test digraph with the following structure:
     * <pre>
     *     7 vertices, 8 edges
     *         0: 6
     *         1: 6
     *         2: 1
     *         3: 5
     *         4: 3
     *         5: 0
     *         6: 2 4
     * </pre>
     */
    export const second: [string, string][] = [
        ['0', '6'],
        ['1', '6'],
        ['2', '1'],
        ['3', '5'],
        ['4', '3'],
        ['5', '0'],
        ['6', '2'],
        ['6', '4']
    ]
}
