export function longestSubstring(sequence: string): number {
  let maxLength = 0;
  let current = "";
  for (let i = 0; i < sequence.length; i++) {
    if (current.includes(sequence[i]!)) {
      current = sequence[i]!;
      continue;
    }
    current += sequence[i];
    if (current.length > maxLength) {
      maxLength = current.length;
    }
  }
  return maxLength;
}
