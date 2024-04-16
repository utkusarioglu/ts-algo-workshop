export function countingSortWithDoubleLoop(unsorted: number[]) {
  if (unsorted.length < 2) {
    return unsorted;
  }
  const minValue = Math.min(...unsorted);
  const maxValue = Math.max(...unsorted);
  const counts = Array(maxValue - minValue + 1).fill(0);

  const getKey = (value: number) => value - minValue;
  const getValue = (key: number) => key + minValue;

  for (let vi = 0; vi < unsorted.length; vi++) {
    const value = unsorted[vi] as number;
    counts[getKey(value)] += 1;
  }

  const sorted: number[] = [];
  for (let ci = 0; ci < counts.length; ci++) {
    const value = getValue(ci);
    const repeat = counts[ci];
    for (let r = 0; r < repeat; r++) {
      sorted.push(value);
    }
  }

  return sorted;
}

export function countingSortWithWhile(unsorted: number[]) {
  if (unsorted.length < 2) {
    return unsorted;
  }
  const minValue = Math.min(...unsorted);
  const maxValue = Math.max(...unsorted);
  const counts = Array(maxValue - minValue + 1).fill(0);

  const getKey = (value: number) => value - minValue;
  const getValue = (key: number) => key + minValue;

  for (let vi = 0; vi < unsorted.length; vi++) {
    const value = unsorted[vi] as number;
    counts[getKey(value)] += 1;
  }

  for (let ci = 1; ci < counts.length; ci++) {
    counts[ci] += counts[ci - 1];
  }

  const sorted: number[] = Array(unsorted.length);

  let ci = counts.length - 1;
  while (counts[0] > 0) {
    if (ci > 0 && counts[ci] === counts[ci - 1]) {
      ci--;
    }
    const si = counts[ci] - 1;
    counts[ci] -= 1;
    sorted[si] = getValue(ci);
  }

  return sorted;
}

export function countingSortWithWhile2(unsorted: number[]) {
  if (unsorted.length < 2) {
    return unsorted;
  }
  const minValue = Math.min(...unsorted);
  const maxValue = Math.max(...unsorted);
  const counts = Array(maxValue - minValue + 1).fill(0);

  const getKey = (value: number) => value - minValue;

  for (let vi = 0; vi < unsorted.length; vi++) {
    const value = unsorted[vi] as number;
    counts[getKey(value)] += 1;
  }

  for (let ci = 1; ci < counts.length; ci++) {
    counts[ci] += counts[ci - 1];
  }

  const sorted: number[] = Array(unsorted.length);

  for (let ui = unsorted.length - 1; ui >= 0; ui--) {
    const value = unsorted[ui] as number;
    const key = getKey(value);
    const index = --counts[key];
    sorted[index] = value;
  }

  return sorted;
}
