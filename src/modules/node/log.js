import chalk from "chalk";
import { inspect } from "util";

const print = (text) => {
  console.log(chalk.white(text));
}

// NOTE: this function is meant to describe objects and arrays
//       It does NOT handle null and Promises correctly!
const printObject = (obj, level = 1, comma = false) => {
  const isArray = obj instanceof Array;
  const printKey = (key) => `${isArray ? "" : '"'}${key}${isArray ? "": '"'}`;
  const spacing = " ".repeat(level);
  const objKeys = Object.keys(obj);

  // empty check
  if (objKeys.length === 0) {
    print(`${spacing}${isArray ? "[]" : "{}"}`);
    return;
  }

  // opening bracket
  print(`${spacing}${isArray ? "[" : "{"}`);

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
        ) {
          print(`${spacing} ${printKey(key)}:`);
          printObject(obj[key], level + 2, !isLastKey);
          break;
        }
      default:
        print(`${spacing} ${printKey(key)}: ${valueDescriptor(obj[key])}${isLastKey ? "" : ","}`);
    }
  }

  // closing bracket
  print(`${spacing}${isArray ? "]" : "}"}${comma ? "," : ""}`);
};

// NOTE: this function assumes objects and arrays to be empty!
//       handle them with printObject() first!
const valueDescriptor = (value) => {
  if (value === null) {
    return chalk.grey("null");
  }
  if (value instanceof Promise) {
    return chalk.cyan(`${inspect(value)}`);
  }
  switch (typeof value) {
    case "function":
      return chalk.cyan(`[Function: ${value.name}]`);
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
      return value instanceof Array
        ? `[ ${chalk.grey("empty")} ]`
        : `{ ${chalk.grey("empty")} }`;
    default:
      return chalk.yellow(`${value}`);
  }
}

// TODO: write doc
function log(value) {
  if (
    typeof value === "object"
    && value !== null
    && !(value instanceof Promise)
    && Object.keys(value).length > 0
  ) {
    printObject(value, 1, false);
  } else {
    print(` ${valueDescriptor(value)}`);
  }
};

export default log;
