import {
  type CheckIfLegalReturn,
  type DirectedEdge,
  type NumCourses,
  Graph,
} from "./course-schedule";

interface TestCase {
  name: string;
  params: {
    dependencies: DirectedEdge[];
    numCourses: NumCourses;
  };
  expected: CheckIfLegalReturn;
}

const TEST_CASES: TestCase[] = [
  {
    name: "LeetCode 1",
    params: {
      dependencies: [[1, 0]],
      numCourses: 2,
    },
    expected: true,
  },
  {
    name: "LeetCode 2",
    params: {
      dependencies: [
        [0, 1],
        [1, 0],
      ],
      numCourses: 2,
    },
    expected: false,
  },
];

describe("CourseSchedule", () => {
  TEST_CASES.forEach(({ name, params, expected }) => {
    it(`Works with ${name}`, () => {
      const graph = new Graph(params.numCourses, params.dependencies);
      const response = graph.checkIfLegal();
      expect(response).toBe(expected);
    });
  });
});
