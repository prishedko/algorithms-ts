import { isMarked, StringMap } from './AuxiliaryTypes'
import { GraphsAPI } from './api'
import { ContainersBuilders } from '../containers/builders'
import { CommonsAPI } from '../commons/api'
import Vertex = GraphsAPI.Vertex
import Digraph = GraphsAPI.Digraph
import newStack = ContainersBuilders.newStack
import Collection = CommonsAPI.Collection
import DepthFirstOrder = GraphsAPI.DepthFirstOrder
import newQueue = ContainersBuilders.newQueue

/**
 * This implementation uses depth-first search. The constructor takes time proportional to <tt>V</tt> + <tt>E</tt>
 * (in the worst case), where <tt>V</tt> is the number of vertices and <tt>E</tt> is the number of edges.
 * Afterwards, the <tt>preorder</tt> and <tt>postorder</tt> operations take constant time, and
 * <tt>reverse postorder</tt> operation takes take time proportional to <tt>V</tt>.
 * <p>
 * For additional documentation,
 * see <a href="http://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class DepthFirstOrderDFS<V> implements DepthFirstOrder<V> {
    private marked = new StringMap<boolean>()          // marked[v] = has v been marked in dfs?
    private verticesPreorder = new StringMap<number>()  // verticesPreorder[v]    = preorder  number of v
    private verticesPostorder = new StringMap<number>() // verticesPostorder[v]   = postorder number of v
    private preorder = newQueue<Vertex<V>>()                // vertices in preorder
    private postorder = newQueue<Vertex<V>>()               // vertices in postorder
    private preCounter = 0                                  // counter or preorder numbering
    private postCounter = 0                                 // counter for postorder numbering

    /**
     * Determines a depth-first order for the digraph {@code G}.
     * @param G the digraph
     */
    constructor(G: Digraph<V>) {
        G.asVerticesCollection().forEach(v => {
            if (!isMarked(v, this.marked)) {
                this.dfs(G, v)
            }
        })
    }

    // run DFS in digraph G from vertex v and compute preorder/postorder
    private dfs(G: Digraph<V>, v: Vertex<V>): void {
        this.marked.set(v.key, true)
        this.verticesPreorder.set(v.key, this.preCounter++)
        this.preorder.enqueue(v)
        G.adjacent(v).forEach(w => {
            if (!isMarked(w, this.marked)) {
                this.dfs(G, w)
            }
        })
        this.postorder.enqueue(v)
        this.verticesPostorder.set(v.key, this.postCounter++)
    }

    preorderNumber(v: Vertex<V>): number {
        if (this.verticesPreorder.has(v.key)) {
            return this.verticesPreorder.get(v.key)!
        }
        return -1
    }

    postorderNumber(v: Vertex<V>): number {
        if (this.verticesPostorder.has(v.key)) {
            return this.verticesPostorder.get(v.key)!
        }
        return -1
    }

    post(): Collection<Vertex<V>> {
        return this.postorder.asCollection()
    }

    pre(): Collection<Vertex<V>> {
        return this.preorder.asCollection()
    }

    reversePost(): Collection<Vertex<V>> {
        const reverse = newStack<Vertex<V>>()
        this.postorder.asCollection().forEach(v => reverse.push(v))
        return reverse.asCollection()
    }
}
