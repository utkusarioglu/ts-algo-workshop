export class CountingSort {
  public loop(unsorted: number[]): number[] {
    const maxValue = Math.max(...unsorted);
    const minValue = Math.min(...unsorted);
    const counts: number[] = Array(maxValue - minValue + 1).fill(0);
    unsorted.forEach((val) => {
      const index = val - minValue;
      counts[index] += 1;
    })
    const sorted = counts.reduce<number[]>((acc, count, offset) => {
      for (let i = 0; i < count; i++) {
        acc.push(minValue + offset);
      }
      return acc;
    }, []);
    return sorted;
  }
}
