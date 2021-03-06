import fs from "fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

// cleanup build dirs
try {
  fs.rmdirSync("./builds", { recursive: true });
  fs.rmdirSync("./browser", { recursive: true });
  fs.mkdirSync("./builds");
  fs.mkdirSync("./browser");
} catch (e) {
  console.log(
    `Couldn't build due to error:\n\t${e}\n\nPlease confirm that you are using a recent version of node`
  );
  process.exit(2);
}

pkg.browser = pkg.browser.replace(/\$npm_package_version/, pkg.version);
pkg.minified = pkg.minified.replace(/\$npm_package_version/, pkg.version);

// output
console.log(`\nBuilding: Spork ${pkg.version}\n`);

export default [
  // browser version
  {
    input: "src/browser.js",
    output: {
      name: "Spork",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      })
    ]
  },
  // minified browser version
  {
    input: "src/browser.js",
    output: {
      name: "Spork",
      file: pkg.minified,
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      terser()
    ]
  },
  // cjs and esm module builds
  {
    input: "src/index.js",
    external: ["node-fetch"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [resolve(), commonjs()]
  }
];
