import { fibonacci } from ".";

describe("fibonacci", () => {
  describe("fibMemo", () => {
    it("Returns 2", () => {
      const expected = 3;
      const response = fibonacci.memoized(2, {});
      expect(response).toBe(expected);
    });
  });

  describe("fib", () => {
    it("Returns 2", () => {
      const expected = 3;
      const response = fibonacci.recursive(2);
      expect(response).toBe(expected);
    });
  });
});
