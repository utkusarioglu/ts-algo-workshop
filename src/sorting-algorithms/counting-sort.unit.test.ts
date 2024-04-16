import {
  countingSortWithDoubleLoop,
  countingSortWithWhile,
  countingSortWithWhile2,
} from "./counting-sort";

const PARAMS = [
  // [],
  // [1],
  // [1, 2],
  // [2, 1],
  [4, 5],
  [1, 2, 3],
  [3, 2, 1],
  [3, 1, 2],
  [2, 3, 1],
  Array(10)
    .fill(null)
    .map((_, i) => i)
    .reverse(),
];

describe("countingSort/countingSortWithDoubleLoop", () => {
  PARAMS.forEach((unsorted) => {
    const expected = [...unsorted].sort((a, b) => a - b);
    const description = [
      JSON.stringify(unsorted),
      "=>",
      JSON.stringify(expected),
    ].join(" ");

    test(description, () => {
      const response = countingSortWithDoubleLoop(unsorted);
      expect(response).toEqual(expected);
    });
  });
});

describe("countingSort/countingSortWithWhile", () => {
  PARAMS.forEach((unsorted) => {
    const expected = [...unsorted].sort((a, b) => a - b);
    const description = [
      JSON.stringify(unsorted),
      "=>",
      JSON.stringify(expected),
    ].join(" ");

    test(description, () => {
      const response = countingSortWithWhile(unsorted);
      expect(response).toEqual(expected);
    });
  });
});

describe("countingSort/countingSortWithWhile2", () => {
  PARAMS.forEach((unsorted) => {
    const expected = [...unsorted].sort((a, b) => a - b);
    const description = [
      JSON.stringify(unsorted),
      "=>",
      JSON.stringify(expected),
    ].join(" ");

    test(description, () => {
      const response = countingSortWithWhile2(unsorted);
      expect(response).toEqual(expected);
    });
  });
});
