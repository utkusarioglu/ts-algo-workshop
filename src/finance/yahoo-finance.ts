import yahooFinance from "yahoo-finance2";

async function main() {
  const result = await yahooFinance.search("AAPL");
  console.dir(result, { depth: null, colors: true });
}

main();
