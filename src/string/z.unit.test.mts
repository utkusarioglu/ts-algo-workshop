import { hello } from "./z.mts";

describe("string/z", () => {
  it("hello", () => {
    expect(hello()).toEqual("hello");
  });
});
