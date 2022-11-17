export function duration(name: string, callback: () => any) {
  const start = performance.now();
  const response = callback();
  const end = performance.now();
  console.log(`${name}: ${end - start}`);
  return response;
}
