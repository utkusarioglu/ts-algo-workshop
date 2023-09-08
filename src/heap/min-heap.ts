type Index = number;
type Value = number;

export class MinHeap {
  private heap: Value[] = [];

  public insert(newElement: Value): void {
    this.heap.push(newElement);
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      const parentValue = this.heap[parentIndex]!;
      const currentValue = this.heap[currentIndex]!;
      if (parentValue < currentValue) {
        return;
      }
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  public getHead(): Value | null {
    if (!this.heap.length) {
      return null;
    }
    return this.heap[0]!;
  }

  public getHeap(): Value[] {
    return this.heap;
  }

  public popHead(): Value | null {
    const head = this.getHead();
    if (head == null) {
      return head;
    }
    const lastIndex = this.heap.length - 1;
    this.heap[0] = this.heap[lastIndex]!;
    this.heap = this.heap.slice(0, lastIndex);
    this.reorder(0);
    return head;
  }

  private getParentIndex(index: Index): Index {
    return (index - 1) >> 1;
  }

  private getLeftChildIndex(index: Index): Index {
    return index * 2 + 1;
  }

  private getRightChildIndex(index: Index): Index {
    return index * 2 + 2;
  }

  private swap(index1: Index, index2: Index): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2]!,
      this.heap[index1]!,
    ];
  }

  private reorder(currentIndex: Index): void {
    const currentValue = this.heap[currentIndex]!;
    const leftChildIndex = this.getLeftChildIndex(currentIndex);
    const rightChildIndex = this.getRightChildIndex(currentIndex);
    const lastIndex = this.heap.length - 1;
    if (leftChildIndex > lastIndex) {
      return;
    }
    const leftChildValue = this.heap[leftChildIndex]!;
    const rightChildValue =
      rightChildIndex > lastIndex
        ? Number.MAX_SAFE_INTEGER
        : this.heap[rightChildIndex]!;
    const smallestChildIndex =
      leftChildValue < rightChildValue ? leftChildIndex : rightChildIndex;
    const smallestChildValue = this.heap[smallestChildIndex]!;
    if (currentValue < smallestChildValue) {
      return;
    }
    this.swap(currentIndex, smallestChildIndex);
    this.reorder(smallestChildIndex);
  }
}
