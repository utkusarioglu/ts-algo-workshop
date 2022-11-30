import { measureDuration } from "../utils";

type FibonacciMemo = Record<number, number>;

/**
 * Houses a bunch of Fibonacci implementations
 */
class Fibonacci {
  /**
   * @dev
   * This one one takes a long time to compute
   */
  public recursive(i: number): number {
    if (i < 1) {
      return 1;
    }
    return this.recursive(i - 1) + this.recursive(i - 2);
  }

  /**
   * @dev
   * This one is faster even without JIT's help.
   */
  public memoized(i: number, memo: FibonacciMemo): number {
    if (i < 1) {
      return 1;
    }
    memo[i - 1] ?? (memo[i - 1] = this.memoized(i - 1, memo));
    memo[i - 2] ?? (memo[i - 2] = this.memoized(i - 2, memo));
    return memo[i - 1]! + memo[i - 2]!;
  }

  /**
   * @dev
   * This would have taken much longer than `recursive` if it wasn't for
   * JIT optimization.
   */
  @measureDuration()
  public recursiveSeries(i: number): number[] {
    return Array(i)
      .fill(null)
      .map((_, i) => this.recursive(i));
  }

  /**
   * @dev
   * This benefits both from `memo` and JIT compilation.
   */
  @measureDuration()
  public memoizedSeries(i: number, memo: FibonacciMemo): number[] {
    return Array(i)
      .fill(null)
      .map((_, i) => this.memoized(i, memo));
  }
}

export const fibonacci = new Fibonacci();
