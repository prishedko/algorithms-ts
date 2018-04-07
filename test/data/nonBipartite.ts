/**
 * Test non-bipartite graph with the following structure:
 * <pre>
 * 8 vertices, 12 edges
 *       0: 3 5 6 7
 *       1: 3 4
 *       2: 3 4 5
 *       3: 0 1 2
 *       4: 1 2 7
 *       5: 0 2 6
 *       6: 0 5 7
 *       7: 0 4 6
 * </pre>
 */

export const nonBipartite: [string, string][] = [
    ['0', '3'],
    ['0', '5'],
    ['0', '6'],
    ['0', '7'],
    ['1', '3'],
    ['1', '4'],
    ['2', '3'],
    ['2', '4'],
    ['2', '5'],
    ['4', '7'],
    ['5', '6'],
    ['6', '7']
]
