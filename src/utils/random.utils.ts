// wikipedia.org/wiki/Fisher–Yates_shuffle
export function shuffleArray<T>(vanilla: T[]): T[] {
  const shuffled = [...vanilla];
  for (let i = vanilla.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vanilla[i]!, vanilla[j]!] = [vanilla[j]!, vanilla[i]!];
  }
  return shuffled;
}
