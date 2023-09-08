import { MinHeap } from "./min-heap";

// wikipedia.org/wiki/Fisher–Yates_shuffle
function shuffleArray<T>(vanilla: T[]): T[] {
  const shuffled = [...vanilla];
  for (let i = vanilla.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vanilla[i]!, vanilla[j]!] = [vanilla[j]!, vanilla[i]!];
  }
  return shuffled;
}

let instance: MinHeap;

beforeEach(() => {
  instance = new MinHeap();
});

const PARAM_LIST = Array(100)
  .fill(null)
  .map((_, i) => i)
  .reverse();

describe("MinHeap", () => {
  Array(PARAM_LIST.length)
    .fill(null)
    .map(() => shuffleArray(PARAM_LIST))
    .forEach((paramList) => {
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

        it.only("Pops sorted", () => {
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
