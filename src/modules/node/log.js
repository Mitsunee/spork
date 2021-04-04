import chalk from "chalk";
import { inspect } from "util";

const print = (text) => {
  console.log(chalk.white(text));
}

// NOTE: this function is meant to describe objects and arrays
//       It does NOT handle null and Promises correctly!
const printObject = (obj, level = 1, comma = false, maxdepth = false) => {
  const isArray = obj instanceof Array;
  const printKey = (key) => isArray ? chalk.yellow(key) : chalk.blue(`"${key}"`);
  const inspection = inspect(obj);
  const isInstanceOf = !isArray
    ? chalk.cyan(inspection.substr(0, inspection.indexOf("{")))
    : "";
  const spacing = " ".repeat(level);
  const objKeys = Object.keys(obj);
  const depth = (level - 1) / 2;

  // empty check
  if (objKeys.length === 0) {
    print(`${spacing}${isArray ? "[]" : `${isInstanceOf}{}`}`);
    return;
  }

  // opening bracket
  print(`${spacing}${isArray ? "[" : `${isInstanceOf}{`}`);

  // values
  for (let keyIndex in objKeys) {
    const isLastKey = Number(keyIndex) === objKeys.length - 1;
    const key = objKeys[keyIndex];

    switch (typeof obj[key]) {
      case "function":
        print(`${spacing} ${printKey(key)}: ${
          chalk.cyan(`[Function: ${key}]`)
        }${isLastKey ? "" : ","}`);
        break;
      case "object":
        if (
          obj[key] !== null
          && !(obj[key] instanceof Promise)
          && Object.keys(obj[key]).length > 0
          && (maxdepth === false ? true : depth + 1 <= maxdepth)
        ) {
          print(`${spacing} ${printKey(key)}:`);
          printObject(obj[key], level + 2, !isLastKey, maxdepth);
          break;
        }
      default:
        print(`${spacing} ${printKey(key)}: ${valueDescriptor(obj[key])}${isLastKey ? "" : ","}`);
    }
  }

  // closing bracket
  print(`${spacing}${isArray ? "]" : "}"}${comma ? "," : ""}`);
};

const valueDescriptor = (value) => {
  if (value === null) {
    return chalk.grey("null");
  }
  if (value instanceof Promise) {
    return chalk.cyan(`${inspect(value)}`);
  }
  switch (typeof value) {
    case "function":
      return chalk.cyan(inspect(value));
    case "string":
      return chalk.blue(`"${value}"`);
    case "boolean":
      if (value === true) {
        return chalk.green("true");
      } else {
        return chalk.red("false");
      }
    case "undefined":
      return chalk.grey("undefined");
    case "object":
      const length = Object.values(value).length;
      const isArray = value instanceof Array;
      return `${isArray ? "[" : "{"} ${
        length === 0
          ? chalk.grey("empty")
          : `${length} Element${length > 1 ? "s" : ""}`
      } ${isArray ? "]" : "}"}`;
    default:
      return chalk.yellow(`${value}`);
  }
}

// TODO: write doc
function log(value, maxdepth = false) {
  if (
    typeof value === "object"
    && value !== null
    && !(value instanceof Promise)
    && Object.keys(value).length > 0
  ) {
    printObject(value, 1, false, maxdepth);
  } else {
    print(` ${valueDescriptor(value)}`);
  }
};

export default log;
