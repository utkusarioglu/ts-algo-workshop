export type Index = number;
export type DirectedEdgeDef = [Index, Index];

class N {
  key: Index;
  ins = new Set<Index>();
  outs = new Set<Index>();

  constructor(key: Index) {
    this.key = key;
  }
}

export class Graph {
  nodes = new Map<Index, N>();

  constructor(size: number, edges: DirectedEdgeDef[]) {
    this.createNodes(size);
    this.createEdges(edges);
  }

  private createNodes(size: number): void {
    Array(size)
      .fill(null)
      .forEach((_, key) => {
        this.nodes.set(key, new N(key));
      });
  }

  private createEdges(edges: DirectedEdgeDef[]): void {
    edges.forEach(([sourceIndex, targetIndex]) => {
      const source = this.nodes.get(sourceIndex);
      const target = this.nodes.get(targetIndex);
      if (source === undefined) {
        throw new Error("SOURCE_UNDEFINED");
      }
      if (target === undefined) {
        throw new Error("TARGET_UNDEFINED");
      }
      source.outs.add(targetIndex);
      target.ins.add(sourceIndex);
    });
  }

  public topologicalSort(): Index[] {
    const sources = new Set<Index>();
    const ins = new Map<Index, number>();
    this.nodes.forEach((node) => {
      if (!node.ins.size) {
        sources.add(node.key);
      } else {
        ins.set(node.key, node.ins.size);
      }
    });
    let count = 0;
    const queue: Index[] = Array.from(sources);
    const order: Index[] = [];

    while (queue.length) {
      const currentIndex = queue.pop()!;
      const currentNode = this.nodes.get(currentIndex)!;
      order.push(currentIndex);
      currentNode.outs.forEach((nodeIndex) => {
        let newInCount = ins.get(nodeIndex)! - 1;
        ins.set(nodeIndex, newInCount);
        if (!newInCount) {
          queue.push(nodeIndex);
        }
      });
      count++;
      if (count > this.nodes.size) {
        throw new Error("COUNT_OVERFLOW");
      }
    }

    return order;
  }
}
