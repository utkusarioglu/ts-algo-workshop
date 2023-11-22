export type Index = number;
export type DirectedEdge = [Index, Index];
export type NumCourses = number;
export type CheckIfLegalReturn = boolean;

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

  constructor(size: number, directedEdges: DirectedEdge[]) {
    this.createNodes(size);
    this.createDirectedEdges(directedEdges);
  }

  public checkIfLegal(): CheckIfLegalReturn {
    const sources = new Set<Index>();
    const inCounts = new Map<Index, number>();
    this.nodes.forEach((node) => {
      if (!node.ins.size) {
        sources.add(node.key);
      }
      inCounts.set(node.key, node.ins.size);
    });

    if (sources.size === 0) {
      console.log("sources size 0");
      return false;
    }

    const order: Index[] = [];
    const queue: Index[] = Array.from(sources);
    let counter = 0;

    while (queue.length) {
      if (++counter > this.nodes.size) {
        throw new Error("COUNTER_OVERFLOW");
      }

      const currentIndex = queue.pop()!;
      const currentNode = this.nodes.get(currentIndex)!;
      order.push(currentIndex);
      currentNode.outs.forEach((inIndex) => {
        const newInSize = inCounts.get(inIndex)! - 1;
        inCounts.set(inIndex, newInSize);
        if (!newInSize) {
          queue.push(inIndex);
        }
      });
    }

    if (counter != this.nodes.size) {
      return false;
    }

    return true;
  }

  private createNodes(size: number): void {
    Array(size)
      .fill(null)
      .forEach((_, i) => {
        this.nodes.set(i, new N(i));
      });
  }

  private createDirectedEdges(directedEdges: DirectedEdge[]): void {
    directedEdges.forEach(([sourceIndex, targetIndex]) => {
      const source = this.nodes.get(sourceIndex);
      const target = this.nodes.get(targetIndex);
      if (!source) {
        throw new Error("UNDEFINED_SOURCE");
      }
      if (!target) {
        throw new Error("UNDEFINED_TARGET");
      }
      source.outs.add(targetIndex);
      target.ins.add(sourceIndex);
    });
  }
}
