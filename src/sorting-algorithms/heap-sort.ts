import "../heap/min-heap";
import { MinHeap } from "../heap/min-heap";

export class HeapSort {
  public static sort(unsorted: number[]): number[] {
    const minHeap = new MinHeap();
    unsorted.forEach((elem) => {
      minHeap.insert(elem);
    });
    const sorted = [];
    while (minHeap.getHead() != null) {
      const head = minHeap.popHead();
      if (head != null) {
        sorted.push(head);
      }
    }
    return sorted;
  }
}
