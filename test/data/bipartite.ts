/**
 * Test bipartite graph with the following structure:
 * <pre>
 * 6 vertices, 7 edges
 *       0: 3 5
 *       1: 3 4
 *       2: 3 4 5
 *       3: 0 1 2
 *       4: 1 2
 *       5: 0 2
 * </pre>
 */

export const bipartite: [string, string][] = [
    ['0', '3'],
    ['0', '5'],
    ['1', '3'],
    ['1', '4'],
    ['2', '3'],
    ['2', '4'],
    ['2', '5']
]
