import type { Pair, CardinalityOverwrite } from "./d2-generator.types";

export const CARDINALITY_OVERWRITES: CardinalityOverwrite[] = [
  {
    name: "many",
    replacement: "*",
  },
];

export const PAIRS: Pair[] = ["0 1", "1", "0 many", "1 many", "many"];
