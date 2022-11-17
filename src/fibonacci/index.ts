class Fibonacci {
  public recursive(i: number): number {
    if (i < 1) {
      return 1;
    }
    return this.recursive(i - 1) + this.recursive(i - 2);
  }

  public memoized(i: number, memo: Record<number, number>): any {
    if (i < 1) {
      return 1;
    }
    memo[i - 1] ?? (memo[i - 1] = this.memoized(i - 1, memo));
    memo[i - 2] ?? (memo[i - 2] = this.memoized(i - 2, memo));
    return memo[i - 1]! + memo[i - 2]!;
  }
}

export const fibonacci = new Fibonacci();
