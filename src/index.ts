import { Fibonacci, fibonacci } from "./fibonacci";
import { randomBytes } from "node:crypto";
import { MatrixCreator } from "./matrix-creation";

// @ts-ignore
function fibonacciThings() {
  const fibNumber = 42;

  console.log("Recursive ".padEnd(50, "-"));
  console.log("Run #1: \n", fibonacci.recursiveSeries(fibNumber));
  console.log("Run #2: \n", fibonacci.recursiveSeries(fibNumber));

  console.log("Memoized ".padEnd(50, "-"));
  const memo = {};
  console.log("Run #1:\n", fibonacci.memoizedSeries(fibNumber, memo));
  console.log("Run #2:\n", fibonacci.memoizedSeries(fibNumber, memo));
  console.log("Run #3:\n", fibonacci.memoizedSeries(fibNumber, memo));
}

// @ts-ignore
function arraySlice() {
  const a = new Array(5).fill(null).map((_, i) => i);
  // @ts-ignore
  a.__proto__.homeMadeSplice = function <T>(start: number, count: number) {
    const removed: T[] = [];
    this.forEach((c: T, i: number) => {
      if (i >= start && i < start + count) {
        removed.push(c);
      }
    }, []);
    return removed;
  };

  // @ts-ignore
  const b = a.homeMadeSplice(2, 1);
  console.log({ a, b });
}

function actor(custom: string) {
  // @ts-ignore
  console.log(this.message, custom, this.extra);
  // // @ts-ignore
  // this.message = obj.message;
  // // @ts-ignore
  // console.log(this.message);
}

// @ts-ignore
function bindCallApply() {
  const one = { message: "one", extra: "This doesn't exist in the other one " };
  // const two = { message: "two" };
  // @ts-ignore
  const binded = actor.bind(one);
  binded("aa");
}

// @ts-ignore
Array.prototype.homeMadeSlice = function (start: number, count: number) {
  const filtered = [];
  for (let i = start; i < start + count; i++) {
    filtered.push(this[i]);
  }
  return filtered;
};

// @ts-ignore
function useHomeMadeSlice() {
  const a = Array(10)
    .fill(null)
    .map((_, i) => i);
  // @ts-ignore
  const sliced = a.homeMadeSlice(3, 4);

  // const b = new Array(10).fill(null).map((_, i) => i);
  console.log({
    a,
    sliced,
    one: Object.getPrototypeOf(a),
    // @ts-ignore
    two: a.__proto__,
    thr: Array.prototype,
    // @ts-ignore
    fou: Array[[Prototype]],
  });
}

class Something {
  one: string;
  two: string;

  constructor(one: string, two: string) {
    this.one = one;
    this.two = two;
  }

  toString() {
    return `Class: ${this.one} ++ ${this.two}`;
  }
}

// @ts-ignore
function toString() {
  Object.prototype.toString = function () {
    // @ts-ignore
    return `${this.one} + ${this.two}`;
  };
  const one = { one: "hello", two: "world" };
  const two = { one: "hello2", two: "world2" };
  console.log(two + " - " + one);
  console.log(Object({}) + "");

  const three = new Something("hello3", "world3");
  console.log(three + "");
  console.log(Object.prototype === Object.getPrototypeOf(one));
}

// @ts-ignore
function titleCase() {
  const message = "hello bunny 22  world!    !!";
  const search = message
    .split(" ")
    .map((word) => (!!word[0] ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
  console.log({ search });
}

// function startsWithOne(str: string, substring: string) {
//   if (substring.length > str.length) {
//     return false;
//   } else if (substring === str) {
//     return true;
//   }

//   const sliced = str.slice(0, substring.length);
//   if (sliced === substring) {
//     return true;
//   }

//   return false;
// }

// function startsWithTwo(str: string, substring: string) {
//   if (substring.length > str.length) {
//     return false;
//   }

//   const sliced = str.slice(0, substring.length);
//   if (sliced === substring) {
//     return true;
//   }

//   return false;
// }

// function startsWithThree(str: string, substring: string) {
//   if (substring.length > str.length) {
//     return false;
//   } else if (substring.length === str.length && substring === str) {
//     return true;
//   }

//   const sliced = str.slice(0, substring.length);
//   if (sliced === substring) {
//     return true;
//   }

//   return false;
// }

// // @ts-ignore
// function startsWithSpeedTest() {
//   const testValues = ["hello", "ha"];
//   measureDurationFunction("1", () => {
//     Array(1000)
//       .fill(testValues)
//       .forEach((args) => {
//         startsWithOne(...(args as [string, string]));
//       });
//   });
//   measureDurationFunction("2", () => {
//     Array(1000)
//       .fill(testValues)
//       .forEach((args) => {
//         startsWithTwo(...(args as [string, string]));
//       });
//   });
//   measureDurationFunction("3", () => {
//     Array(1000)
//       .fill(testValues)
//       .forEach((args) => {
//         startsWithThree(...(args as [string, string]));
//       });
//   });
// }

// @ts-ignore
function xorThings(): boolean {
  const a = [true, false, true, false, true, false, true];
  return a.reduce((p, c) => (!p && c) || (p && !c), !a[0]!);
  return false;
}

// @ts-ignore
function bigArray() {
  const size = 2 ** 32 - 2;
  console.log((size * 32) / 8 / 1024 / 1024 / 1024);
  // return Array(size).fill(null);
  // return Array(2 ** 14).fill(null);
}

// @ts-ignore
function bigInt() {
  const na = 999999999999999999999999999999999999999n;
  console.log(na * na);
}

// @ts-ignore
function randomBigInt(): void {
  const rand = BigInt("0x" + randomBytes(20).toString("hex"));
  console.log(rand);
}

// @ts-ignore
function iterable() {
  const a = Array(4)
    .fill(null)
    .map((_, i) => i);
  const iter = a[Symbol.iterator]();

  console.log("starting");
  let current = iter.next();
  while (!current.done) {
    console.log(current.value);
    current = iter.next();
  }
  console.log("finished");
}

// @ts-ignore
function matrixCreation() {
  const size = 5000;
  MatrixCreator.predefinedRow(size);
  MatrixCreator.higherOrderArray(size);
  MatrixCreator.forLoops(size);
}

class Some {
  public static something(strings: TemplateStringsArray, ...args: string[]) {
    console.log({ strings, args });
    const combined = [];
    for (let i = 0; i < strings.length; i++) {
      combined.push(strings[i]);
      if (i < args.length) {
        combined.push(args[i]);
        combined.push(args[i]);
      }
    }
    return combined.join("");
  }
}

// @ts-ignore
function templateLiteral() {
  const a = "something";
  const b = "banana";
  const c = "hello = ye";
  return Some.something`select ${a} from ${b} where ${c}`;
}

function a(s2: TemplateStringsArray, ...a2: [string, string]) {
  console.log({ s2, a2 });
  return "inner";
}
function b(s1: TemplateStringsArray, ...a1: [string]) {
  console.log({ s1, a1 });
  return a;
}

// @ts-ignore
function templateLiteral2() {
  const a1 = "a1-";
  const a21 = "a21-";
  const a22 = "a22-";
  console.log(b`hello ${a1}``world ${a21} ${a22}`);
}

function d(s2: TemplateStringsArray) {
  console.log({ s2, raw: s2.raw });
  return (s3: TemplateStringsArray) => (l: string) =>
    `last2 ${s3.join("-")} = ${l}`;
}

function c(s1: TemplateStringsArray, ...args: string[]) {
  console.log({ s1, raw: s1.raw, args });
  return ((s2: TemplateStringsArray) => d(s2))(s1);
}

// @ts-ignore
function templateLiteral3() {
  const a = "a";
  const b = "b";
  console.log(c`hello ${a}h${b}``sa`("asdfs"));
}

// @ts-ignore
function stringsRaw() {
  console.log(String.raw({ raw: `hello\n\nworld` }));
  console.log(String.raw`hello\n\nworld`);
}

// @ts-ignore
function reflectObject() {
  const target = {
    message1: () => {
      const num = Array(1e7)
        .fill(Math.random())
        .reduce((p, c) => p + c, 0);
      return num.toString();
    },
    message2: "everyone",

    message3: function (banana: string, red: string) {
      return banana + red + this.message2 + this.message1();
    },
  };
  // let runCount = 0;
  const handler3 = {
    runCount: 0,

    get(target: any, propertyKey: string, receiver: any[]) {
      return (() => {
        this.runCount++;
        const start = performance.now();
        const response = Reflect.get(target, propertyKey, receiver);
        const end = performance.now();
        console.log({
          propertyKey,
          duration: Math.round((end - start) * 1e4) / 1e4,
        });
        return response;
      })();
    },
  };

  const proxy3 = new Proxy(target, handler3);

  console.log(proxy3.message1()); // hello
  console.log(proxy3.message2); // world
  console.log(proxy3.message3("aa", "bb")); // world
}

// @ts-ignore
function reflectClass() {
  type PushLog = (entry: any) => void;

  class Logger {
    private log: any[] = [];

    public pushLog(e: any) {
      this.log.push(e);
    }

    public getLog(): any[] {
      return this.log;
    }
  }
  const logger = new Logger();

  const handler = (logger: PushLog) => ({
    get<T extends object>(target: T, propertyKey: keyof T, receiver: any[]) {
      return (...args: any[]) => {
        const start = performance.now();
        // @ts-ignore
        const response = Reflect.apply(target[propertyKey], target, args);
        const end = performance.now();
        logger({
          time: Date.now(),
          target,
          receiver,
          propertyKey,
          args,
          duration: (end - start).toLocaleString("EN-US"),
          unit: "msec",
        });
        return response;
      };
    },
  });
  type FibonacciInstance = InstanceType<typeof Fibonacci>;
  const proxy = new Proxy<FibonacciInstance>(
    fibonacci,
    handler(logger.pushLog.bind(logger))
  );
  const memo = {};
  const len = 40;
  console.log({
    memoized: proxy.memoizedSeries(len, memo),
    recursive: proxy.recursiveSeries(len),
  });
  console.log(logger.getLog());
}

// @ts-ignore
function descriptorProps() {
  const a = {
    one: 1,
    two: 2,
    thr: 3,
  };
  Object.defineProperty(a, "thr", { enumerable: false });
  console.log(Object.getOwnPropertyNames(a));
  // for (let o in a) {
  //   console.log(o);
  // }
  const descriptors = Object.getOwnPropertyDescriptors(a)!;
  console.log({ descriptors });
}

/**
 * Calculates the median of the given array
 */
function calculateMedian(array: number[]) {
  if (array.length % 2 === 0) {
    const medianIndexLast = array.length / 2;
    const medianIndexFirst = medianIndexLast - 1;
    const medianElemFirst = array[medianIndexFirst];
    const medianElemLast = array[medianIndexLast];
    if (!medianElemFirst || !medianElemLast) {
      throw new Error("Window size is incompatible with median calculation");
    }
    return (medianElemFirst + medianElemLast) / 2;
  } else {
    const medianIndex = Math.floor(array.length / 2);
    const median = array[medianIndex];
    if (!median) {
      throw new Error("Window size is incompatible with median calculation");
    }
    return median;
  }
}

/**
 * Calculates the moving median of the given array
 *
 * @param windowSize window size for which to calculate the moving median
 * @param inputArray input values for which the moving medians will be calculated
 * @returns array of moving medians for the given input array for the specified
 * window size.
 */
function calculateMovingMedian(
  windowSize: number,
  inputArray: number[]
): number[] {
  const medians: number[] = [];
  mainLoop: for (
    let i = -windowSize;
    i < inputArray.length - windowSize + 1;
    i++
  ) {
    const windowStart = Math.max(i, 0); // #1
    const windowEnd = Math.min(inputArray.length, i + windowSize);
    const window = inputArray.slice(windowStart, windowEnd);
    if (window.length < 1) {
      continue mainLoop;
    }
    const windowSorted = [...window].sort((a, b) => a - b);
    const median = calculateMedian(windowSorted);
    medians.push(median);
  }
  return medians;
}

// @ts-ignore
function arrayChallenge(arr: number[]): string {
  const windowSize = arr[0];
  if (!windowSize) {
    throw new Error("Input array cannot be empty");
  }
  const values = arr.slice(1);
  const movingMedians = calculateMovingMedian(windowSize, values);
  return movingMedians.join(",");
}

// @ts-ignore
function arrayChallengeCall() {
  console.log("-".repeat(10));
  const inputArray = [6, 1, 3, 5, 10, 6, 4, 3, 1];
  const result = arrayChallenge(inputArray);
  console.log({ result });
}

function main() {
  arrayChallengeCall();
}

main();
