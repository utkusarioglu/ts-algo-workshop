import { CARDINALITY_OVERWRITES, PAIRS } from "./d2-generator.constants";
import type { Pair, CardinalityOverwrite } from "./d2-generator.types";

function reduceKey(pair: Pair) {
  return pair.split(" ").reduce((acc, curr) => {
    acc += curr.toString();
    return acc;
  }, "");
}

function filterCardinalityOverwrite(
  overwrites: CardinalityOverwrite[],
  element: string
): CardinalityOverwrite | null {
  const overwrite = overwrites.filter(({ name }) => name === element);
  if (overwrite.length > 1) {
    throw new Error(`${element} returned multiple overwrites`);
  }

  if (!overwrite) {
    return null;
  }

  return overwrite[0]!;
}

function reduceValue(overwrites: CardinalityOverwrite[], pair: Pair) {
  const elements = pair.split(" ");
  let construction = "";

  if (elements.length === 0 || elements.length > 2) {
    throw new Error(
      `A pair can have either 1 or 2 elements, given had ${elements.length}`
    );
  }

  if (elements.length > 0) {
    const element = elements[0]!;
    const overwrite = filterCardinalityOverwrite(overwrites, element);
    construction += overwrite ? overwrite.replacement : element;
  }

  if (elements.length > 1) {
    construction += "..";
    const element = elements[1]!;
    const overwrite = filterCardinalityOverwrite(overwrites, element);
    construction += overwrite ? overwrite.replacement : element;
  }

  return construction;
}

function stringifyCardinality(
  overwrites: CardinalityOverwrite[],
  sourcePair: Pair,
  targetPair: Pair
) {
  const sourceKey = reduceKey(sourcePair);
  const targetKey = reduceKey(targetPair);
  const sourceValue = reduceValue(overwrites, sourcePair);
  const targetValue = reduceValue(overwrites, targetPair);
  const stringified = [
    `  cardinality_${sourceKey}_${targetKey}: {`,
    `    source-arrowhead.label: ${sourceValue}`,
    `    target-arrowhead.label: ${targetValue}`,
    "  }",
  ].join("\n");

  return stringified;
}

function main(overwrites: CardinalityOverwrite[], pairs: Pair[]) {
  const list = [];
  for (let sourcePair of pairs) {
    for (let targetPair of pairs) {
      list.push(stringifyCardinality(overwrites, sourcePair, targetPair));
    }
  }
  const classesObject = ["classes: {", list.join("\n\n"), "}"];
  console.log(classesObject.join("\n"));
}

main(CARDINALITY_OVERWRITES, PAIRS);
