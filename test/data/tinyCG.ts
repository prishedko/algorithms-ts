/**
 * Test undirected graph with the following structure:
 * <pre>
 * 6 vertices, 8 edges
 *       0: 2 1 5
 *       1: 0 2
 *       2: 0 1 3 4
 *       3: 5 4 2
 *       4: 3 2
 *       5: 3 0
 * </pre>
 */

export const tinyCG: [string, string][] = [
    ['0', '5'],
    ['2', '4'],
    ['2', '3'],
    ['1', '2'],
    ['0', '1'],
    ['3', '4'],
    ['3', '5'],
    ['0', '2']
]
