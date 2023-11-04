import { longestSubstring } from "./longest-substring";

interface TestCase {
  params: string;
  expected: number;
}

const TEST_CASES: TestCase[] = [
  {
    params: "",
    expected: 0,
  },
  {
    params: "bbbbbb",
    expected: 1,
  },
  {
    params: "abc",
    expected: 3,
  },
  {
    params: "ababab",
    expected: 2,
  },
  {
    params: "abcabc",
    expected: 3,
  },
  {
    params: "abcabcdabc",
    expected: 4,
  },
  {
    params: "pwwkew",
    expected: 3,
  },
  {
    params: "abcabcbb",
    expected: 3,
  },
];

describe("longestSubstring", () => {
  TEST_CASES.forEach(({ params, expected }) => {
    it(`Works with '${params}'`, () => {
      const response = longestSubstring(params);

      expect(response).toBe(expected);
    });
  });
});
