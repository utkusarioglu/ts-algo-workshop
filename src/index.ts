import { measureDuration } from "./utils";
import { fibonacci } from "./fibonacci";
import { randomBytes } from "node:crypto";

// @ts-ignore
function fib() {
  const fibNumber = 42;
  measureDuration("recursive", () => fibonacci.recursive(fibNumber));
  measureDuration("recursive", () => fibonacci.recursive(fibNumber));
  const memo = {};
  fibonacci.memoized(fibNumber, memo);
  measureDuration("memoized", () => fibonacci.memoized(fibNumber, memo));
  measureDuration("memoized", () => fibonacci.memoized(fibNumber, memo));
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

function startsWithOne(str: string, substring: string) {
  if (substring.length > str.length) {
    return false;
  } else if (substring === str) {
    return true;
  }

  const sliced = str.slice(0, substring.length);
  if (sliced === substring) {
    return true;
  }

  return false;
}

function startsWithTwo(str: string, substring: string) {
  if (substring.length > str.length) {
    return false;
  }

  const sliced = str.slice(0, substring.length);
  if (sliced === substring) {
    return true;
  }

  return false;
}

function startsWithThree(str: string, substring: string) {
  if (substring.length > str.length) {
    return false;
  } else if (substring.length === str.length && substring === str) {
    return true;
  }

  const sliced = str.slice(0, substring.length);
  if (sliced === substring) {
    return true;
  }

  return false;
}

// @ts-ignore
function startsWithSpeedTest() {
  const testValues = ["hello", "ha"];
  measureDuration("1", () => {
    Array(1000)
      .fill(testValues)
      .forEach((args) => {
        startsWithOne(...(args as [string, string]));
      });
  });
  measureDuration("2", () => {
    Array(1000)
      .fill(testValues)
      .forEach((args) => {
        startsWithTwo(...(args as [string, string]));
      });
  });
  measureDuration("3", () => {
    Array(1000)
      .fill(testValues)
      .forEach((args) => {
        startsWithThree(...(args as [string, string]));
      });
  });
}

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

function fibDecorated() {
  const fibNumber = 42;
  console.log("recursive 1: \n", fibonacci.recursiveSeries(fibNumber));
  console.log("recursive 2: \n", fibonacci.recursiveSeries(fibNumber));
  console.log("-".repeat(40));
  const memo = {};
  console.log("memoized 1:\n", fibonacci.memoizedSeries(fibNumber, memo));
  console.log("memoized 2:\n", fibonacci.memoizedSeries(fibNumber, memo));
  console.log("memoized 3:\n", fibonacci.memoizedSeries(fibNumber, memo));
}

function main() {
  fibDecorated();
}

main();
