import { greet } from ".";

describe("greeting", () => {
  describe("greed()", () => {
    it("Returns the expected greeting", () => {
      const response = greet();
      const expected = "Hey there";
      expect(response).toBe(expected);
    });
  });
});
