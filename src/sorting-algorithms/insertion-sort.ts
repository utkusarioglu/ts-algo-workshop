export class InsertionSort {
  public loop(unsorted: number[]): number[] {
    for (let i = 1; i < unsorted.length; i++) {
      inner: for (let j = i; j > 0; j--) {
        if (unsorted[j - 1]! < unsorted[j]!) {
          continue inner;
        }
        const temp: number = unsorted[j]!;
        unsorted[j] = unsorted[j - 1]!;
        unsorted[j - 1] = temp;
      }
    }
    return unsorted;
  }
}
