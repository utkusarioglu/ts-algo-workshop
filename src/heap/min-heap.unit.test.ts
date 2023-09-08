import { MinHeap } from "./min-heap";
import { shuffleArray } from "../utils/random.utils";

let instance: MinHeap;

beforeEach(() => {
  instance = new MinHeap();
});

const PARAM_LIST = Array(100)
  .fill(null)
  .map((_, i) => i)
  .reverse();

const shuffledLists = Array(PARAM_LIST.length)
  .fill(null)
  .map(() => shuffleArray(PARAM_LIST));

describe("MinHeap", () => {
  shuffledLists.forEach((paramList) => {
    describe(["Loop (", paramList.join(","), ")"].join(""), () => {
      beforeEach(() => {
        paramList.forEach((param) => {
          instance.insert(param);
        });
      });

      it("Reorders after inserts", () => {
        const response = instance.getHead();
        const expected = Math.min(...paramList);

        expect(response).toEqual(expected);
      });

      it("Pops sorted", () => {
        const responses: number[] = [];
        while (instance.getHead() != null) {
          const response = instance.popHead();
          if (response != null) {
            responses.push(response);
          }
        }
        const expected = paramList.sort((a, b) => a - b);

        expect(responses).toEqual(expected);
      });
    });
  });
});
