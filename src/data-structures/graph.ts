declare global {
  interface Set<T> {
    difference: (b: Set<T>) => Set<T>;
  }
}

export interface GraphNode {
  value: number;
  neighbors: Set<GraphNode>;
  addNeighbor(node: GraphNode): void;
}

// type NodePair = [GraphNode, GraphNode];

// export type Definitions = Set<NodePair>;

Set.prototype.difference = function <T>(b: Set<T>): Set<T> {
  const aArray = Array.from(this);
  const bArray = Array.from(b);
  const differenceSet = new Set<T>();

  aArray.forEach((aElem) => {
    if (!bArray.includes(aElem)) {
      differenceSet.add(aElem);
    }
  });

  return differenceSet;
};

export function nodeFactory(
  value: GraphNode["value"],
  initialNeighbors?: GraphNode[]
): GraphNode {
  const neighbors = new Set<GraphNode>(initialNeighbors || []);
  const addNeighbor = (neighbor: GraphNode) => neighbors.add(neighbor);

  return {
    value,
    neighbors,
    addNeighbor,
  } as GraphNode;
}

export function findHeads(graph: Set<GraphNode>): Set<GraphNode> {
  const nodes: Set<GraphNode> = new Set();
  const directedTo: Set<GraphNode> = new Set();
  for (const source of graph) {
    nodes.add(source);
    for (const target of source.neighbors) {
      nodes.add(target);
      directedTo.add(target);
    }
  }
  return nodes.difference(directedTo);
}

export function bfs(head: GraphNode): Array<GraphNode> {
  const visited: GraphNode[] = [];
  const queued: GraphNode[] = [head];

  while (queued.length) {
    const current = queued.shift();
    if (!current) {
      throw new Error("We shouldn't be able to reach here");
    }
    if (visited.includes(current)) {
      continue;
    }
    visited.push(current);
    current.neighbors.forEach((neighbor) => {
      const isVisited = visited.includes(neighbor);
      const isQueued = queued.includes(neighbor);
      if (isVisited || isQueued) {
        return;
      }
      queued.push(neighbor);
    });
  }

  return visited;
}

export function dfs(head: GraphNode): GraphNode[] {
  const visited: GraphNode[] = [];
  const stack: GraphNode[] = [head];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }
    visited.push(current);
    current.neighbors.forEach((neighbor) => {
      const isOnStack = stack.includes(neighbor);
      const isOnVisited = visited.includes(neighbor);
      if (!(isOnStack || isOnVisited)) {
        stack.push(neighbor);
      }
    });
  }

  return visited;
}

export function copy(head: GraphNode, watermark: number = 0): GraphNode[] {
  const original = dfs(head);
  const copied: GraphNode[] = [];

  const getCopiedNode = (key: GraphNode["value"]): GraphNode => {
    if (!copied[key]) {
      copied[key] = nodeFactory(key + watermark);
    }
    return copied[key]!;
  };

  for (const oNode of original) {
    const cNode = getCopiedNode(oNode.value);
    oNode.neighbors.forEach((oNeighbor) => {
      const cNeighborNode = getCopiedNode(oNeighbor.value);
      cNode.addNeighbor(cNeighborNode);
    });
  }

  return copied;
}
