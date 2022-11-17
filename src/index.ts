import { duration } from "./utils";
import { fibonacci } from "./fibonacci";

function main() {
  const fibNumber = 42;
  duration("recursive", () => fibonacci.recursive(fibNumber));
  duration("recursive", () => fibonacci.recursive(fibNumber));
  const memo = {};
  fibonacci.memoized(fibNumber, memo);
  duration("memoized", () => fibonacci.memoized(fibNumber, memo));
  duration("memoized", () => fibonacci.memoized(fibNumber, memo));
}

main();
