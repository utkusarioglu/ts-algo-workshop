import {
  nodeFactory,
  bfs,
  dfs,
  findHeads,
  type GraphNode,
  copy,
} from "./graph";

describe("graph", () => {
  describe("findHeads", () => {
    it("Detects 1", () => {
      const nodes: GraphNode[] = Array(5)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[0]!.addNeighbor(nodes[1]!);
      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[3]!.addNeighbor(nodes[4]!);
      nodes[1]!.addNeighbor(nodes[3]!);

      const heads = findHeads(new Set<GraphNode>(nodes));
      expect(heads.size).toBe(1);
    });

    it("Detects 2", () => {
      const nodes: GraphNode[] = Array(5)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[0]!.addNeighbor(nodes[1]!);
      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[1]!.addNeighbor(nodes[3]!);

      const heads = findHeads(new Set<GraphNode>(nodes));
      expect(heads.size).toBe(2);
    });

    it("Detects 3", () => {
      const nodes: GraphNode[] = Array(5)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[1]!.addNeighbor(nodes[3]!);

      const heads = findHeads(new Set<GraphNode>(nodes));
      expect(heads.size).toBe(3);
    });
  });

  describe("bfs", () => {
    it("DOES", () => {
      const nodes: GraphNode[] = Array(7)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[0]!.addNeighbor(nodes[1]!);
      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[5]!);
      nodes[5]!.addNeighbor(nodes[6]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[2]!.addNeighbor(nodes[4]!);

      const heads = findHeads(new Set(nodes));

      expect(heads.size).toBe(1);
      const head = Array.from(heads)[0];
      if (!head) {
        throw new Error("There should be a head");
      }
      console.log(bfs(head));
    });
  });

  describe("dfs", () => {
    it("DOES", () => {
      const nodes: GraphNode[] = Array(7)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[0]!.addNeighbor(nodes[1]!);
      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[5]!);
      nodes[5]!.addNeighbor(nodes[6]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[2]!.addNeighbor(nodes[4]!);

      const heads = findHeads(new Set(nodes));

      expect(heads.size).toBe(1);
      const head = Array.from(heads)[0];
      if (!head) {
        throw new Error("There should be a head");
      }
      const dfsResponse = dfs(head);
      console.log(dfsResponse);
      expect(dfsResponse.length).toBe(nodes.length);
    });
  });

  describe("copy", () => {
    it("Copy bfs", () => {
      const nodes: GraphNode[] = Array(7)
        .fill(null)
        .map((_, i) => nodeFactory(i));

      nodes[0]!.addNeighbor(nodes[1]!);
      nodes[1]!.addNeighbor(nodes[2]!);
      nodes[2]!.addNeighbor(nodes[5]!);
      nodes[5]!.addNeighbor(nodes[6]!);
      nodes[2]!.addNeighbor(nodes[3]!);
      nodes[2]!.addNeighbor(nodes[4]!);

      const heads = findHeads(new Set(nodes));

      const head = Array.from(heads)[0];
      if (!head) {
        throw new Error("There should be a head");
      }
      const original = bfs(head);
      const watermark = 1;
      const copied = copy(head, watermark);

      const isAllThere = original
        .reduce((acc, oNode) => {
          const filtered = copied.filter(
            (cNode) => cNode.value === oNode.value + watermark
          );
          acc.push(filtered.length === 1);
          return acc;
        }, [] as boolean[])
        .every((a) => a);

      expect(isAllThere).toBe(true);
    });
  });
});
