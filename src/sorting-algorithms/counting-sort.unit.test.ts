import { CountingSort } from "./counting-sort";

let instance: CountingSort;

beforeEach(() => {
  instance = new CountingSort();
});

describe("CountingSort", () => {
  describe("loop", () => {
    [
      [3, 2, 1],
      [2, 2, 3],
      [1, 2, 2, 3],
    ].forEach((unsorted) => {
      it(`Handles ${unsorted.join(", ")}`, () => {
        const response = instance.loop(unsorted);
        const expected = [...unsorted].sort();
        expect(response).toEqual(expected);
      });
    });
  });
});
