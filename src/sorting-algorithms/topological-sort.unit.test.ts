import { type Index, type DirectedEdgeDef, Graph } from "./topological-sort";

type BeforeAfterRelationship = [Index, Index];

interface TestCase {
  name: string;
  params: {
    nodeCount: number;
    edges: DirectedEdgeDef[];
  };
  expected: {
    beforeAfterRelationship: BeforeAfterRelationship[];
  };
}

const TEST_CASES: TestCase[] = [
  {
    name: "Geeks for Geeks 1",
    params: {
      nodeCount: 6,
      edges: [
        [5, 2],
        [5, 0],
        [4, 0],
        [4, 1],
        [2, 3],
        [3, 1],
      ],
    },
    expected: {
      beforeAfterRelationship: [
        [5, 0],
        [4, 0],
        [4, 1],
        [5, 2],
        [2, 3],
        [3, 1],
        [5, 3],
        [5, 1],
      ],
    },
  },
  {
    name: "Geeks for Geeks 2",
    params: {
      nodeCount: 5,
      edges: [
        [0, 1],
        [1, 2],
        [3, 2],
        [3, 4],
      ],
    },
    expected: {
      beforeAfterRelationship: [
        [0, 1],
        [1, 2],
        [3, 2],
        [3, 4],
        [0, 2],
      ],
    },
  },
];

describe.only("Topological Sort", () => {
  TEST_CASES.forEach(
    ({
      name,
      params: { nodeCount, edges },
      expected: { beforeAfterRelationship },
    }) => {
      it(`Works with ${name} - Size`, () => {
        const graph = new Graph(nodeCount, edges);
        const response = graph.topologicalSort();
        expect(response.length).toEqual(nodeCount);
      });

      it(`Works with ${name} - Elements`, () => {
        const graph = new Graph(nodeCount, edges);
        const response = new Set(graph.topologicalSort());
        const expected = new Set(
          Array(nodeCount)
            .fill(null)
            .map((_, i) => i)
        );

        expect(response).toEqual(expected);
      });

      it(`Works with ${name} - BeforeAfterRelationship`, () => {
        const graph = new Graph(nodeCount, edges);
        const response = graph.topologicalSort();
        beforeAfterRelationship.forEach(([before, after]) => {
          expect(response.findIndex((i) => i === before)).toBeLessThan(
            response.findIndex((i) => i === after)
          );
        });
      });
    }
  );
});
