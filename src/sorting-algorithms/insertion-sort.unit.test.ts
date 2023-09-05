import { InsertionSort as Sorter } from "./insertion-sort";

let instance: Sorter;

beforeEach(() => {
  instance = new Sorter();
});

describe("InsertionSort", () => {
  describe("loop", () => {
    [
      [3, 2, 1],
      [2, 2, 3],
      [1, 2, 2, 3],
      Array(101)
        .fill(null)
        .map((_, i) => i)
        .reverse(),
      Array(1001)
        .fill(null)
        .map((_, i) => i)
        .reverse(),
      Array(1001).fill(100),
    ].forEach((unsorted) => {
      it(`Handles ${unsorted.join(", ")}`, () => {
        const response = instance.loop(unsorted);
        const expected = [...unsorted].sort((a, b) => a - b);
        expect(response).toEqual(expected);
      });
    });
  });
});
