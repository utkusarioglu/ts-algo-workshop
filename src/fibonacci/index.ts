import { duration } from "../utils";

/**
 * @dev
 * #1 This should be related to the class method names, not "string"
 */
type MethodParams<
  ClassInstance extends abstract new (...args: any[]) => any,
  MethodName extends string // #1
> = Parameters<InstanceType<ClassInstance>[MethodName]>;

class Fibonacci {
  public recursive(i: number): number {
    if (i < 1) {
      return 1;
    }
    return this.recursive(i - 1) + this.recursive(i - 2);
  }

  @duration()
  public recursiveSeries(i: number): number[] {
    return Array(i)
      .fill(null)
      .map((_, i) => this.recursive(i));
  }

  public memoized(i: number, memo: Record<number, number>): number {
    if (i < 1) {
      return 1;
    }
    memo[i - 1] ?? (memo[i - 1] = this.memoized(i - 1, memo));
    memo[i - 2] ?? (memo[i - 2] = this.memoized(i - 2, memo));
    return memo[i - 1]! + memo[i - 2]!;
  }

  @duration()
  public memoizedSeries(i: number, memo: Record<number, number>): number[] {
    return Array(i)
      .fill(null)
      .map((_, i) => this.memoized(i, memo));
  }

  @duration()
  public recursiveMeasured(
    ...args: MethodParams<typeof Fibonacci, "recursive">
  ) {
    return this.recursive(...args);
  }

  @duration()
  public memoizedMeasured(...args: MethodParams<typeof Fibonacci, "memoized">) {
    return this.memoized(...args);
  }
}

export const fibonacci = new Fibonacci();
