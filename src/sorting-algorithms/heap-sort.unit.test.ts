import { shuffleArray } from "../utils/random.utils";
import { HeapSort } from "./heap-sort";

const PARAM_LIST = Array(100)
  .fill(null)
  .map((_, i) => i)
  .reverse();

const shuffledLists = Array(PARAM_LIST.length)
  .fill(null)
  .map(() => shuffleArray(PARAM_LIST));

describe("HeapSort", () => {
  shuffledLists.forEach((unsorted) => {
    it(`Handles ${unsorted.length} elements`, () => {
      const response = HeapSort.sort(unsorted);
      const expected = [...unsorted].sort((a, b) => a - b);
      expect(response).toEqual(expected);
    });
  });
});
