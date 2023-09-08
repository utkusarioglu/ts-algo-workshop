import { measureDuration, type Logger } from "../utils/measure.utils";

type Matrix = number[][];

const logger: Logger = ({ propertyKey, duration, unit }) => {
  console.log([propertyKey.padEnd(20), ":", duration, " ", unit].join(""));
};

export class MatrixCreator {
  @measureDuration({ logger })
  public static predefinedRow(size: number): Matrix {
    const matrix: Matrix = [];
    const zeroRow = Array(size).fill(0);
    for (let i = 0; i < size; i++) {
      const row = [...zeroRow];
      row[i] = 1;
      matrix.push(row);
    }
    return matrix;
  }
  @measureDuration({ logger })
  public static higherOrderArray(size: number): Matrix {
    const matrix: Matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push(
        Array(size)
          .fill(0)
          .map((_, j) => (i === j ? 1 : 0))
      );
    }
    return matrix;
  }

  @measureDuration({ logger })
  public static forLoops(size: number): Matrix {
    const matrix: Matrix = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!matrix[i]) {
          matrix[i] = [];
        }
        if (i === j) {
          matrix[i]![j] = 1;
        } else {
          matrix[i]![j] = 0;
        }
      }
    }
    return matrix;
  }
}
