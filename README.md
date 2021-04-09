# Spork.js

![version](https://img.shields.io/github/v/tag/Mitsunee/spork?style=for-the-badge) ![npmversion](https://img.shields.io/npm/v/@mitsunee/spork?style=for-the-badge)  
Spork.js is a collection of small functions.

https://www.npmjs.com/package/@mitsunee/spork

# Usage

**Via yarn/npm**: Install the package from the registry:

```bash
npm install --save-dev @mitsunee/spork
# or
yarn add -D @mitsunee/spork
```

Spork contains separate packages for the module and browser version. If you are using Spork in a browser please specify this during the import. Both `require` and ES6 `import` are supported.

Import the package:

```js
// All modules
import Spork from "@mitsunee/spork"; // for node script modules
import Spork from "@mitsunee/spork/browser"; // for in-browser use

// or specific module(s)
import { range, clamp } from "@mitsunee/spork"; // for node script modules
import { range, clamp } from "@mitsunee/spork/browser"; // for in-browser use
```

**For Browsers**: If you are not using npm/yarn you can also download the latest `spork-{version}.js` or `spork-{version}.min.js` from [./browser](https://github.com/Mitsunee/spork/tree/main/browser) and include it manually.

```html
<script src="spork-{version}.min.js"></script>
```

# Documentation

Spork offers the following Modules:

<details>
<summary>clamp</summary>

## clamp

_v1.0.0+_  
Equivalent to what Math.clamp will hopefully one day be
Returns the best possible value between a value, minimum and maximum

```ts
clamp(value: Number, min: Number, max: Number): (Number|Boolean)
```

- Number `value` - The value to be clamped
- Number `min` - The minimum value to be returned
- Number `max` - The maximum value to be returned

Returns: Number (or false for invalid arguments)

</details>
<details>
<summary>range</summary>

## range

_v1.0.0+_  
Generates an Array with all Numbers in a specified range

```ts
range(start: Number [, stop: Number [, step: Number [, maxLength: Number]]]): Array
```

- Number start - Start value. If this is the only argument this is length instead and the start value will be 0.
- Number stop (optional, see above) - stop value
- Number step (optional, default: 1) - steps between values
- Number maxLength (optional) - maximum number of items in the resulting Array

To skip optional arguments please use `undefined`.

```js
range(3, undefined, 0.5);
// [ 0, 0.5, 1, 1.5, 2, 2.5 ]
```

Returns: Array (or false if no valid argument was provided)

</details>
<details>
<summary>fetchJson</summary>

## fetchJson

_v1.0.0+, async_ (Node script version requires package `node-fetch`)  
Asynchronous wrapper function for fetch that automatically parses received json data into an object

```ts
fetchJson(url: String [, option: Mixed]): (Object|Boolean)
```

- String `url` - the url to fetch
- Mixed `option` (optional) - either:
  - Object: your custom init (note that only typeof is checked, validity is not questioned)
  - String `"forceReload"` for the provided forceReload header
  - Boolean false (default)

Returns: Object (potentially Array) or false if something went wrong (see error in console)

</details>
<details>
<summary>interval</summary>

## interval

_v1.2.0+_  
Wrapper class for `setInterval`

### Methods:

**constructor**: Creates new instance.

```ts
new interval(callback: Function, intervalLength: Number[, intervalLengthUnit: String])
```

- Function `callback` - callback function to run on each interval
- Number `intervalLength` - the length of each interval
- String `intervalLengthUnit` (optional, default: "ms") - the unit for the length given

**start**: Starts the interval

```ts
myInterval.start();
```

Returns: Boolean - `true` if interval was started. Rejects with `false` if interval was already running.

**stop**: Stops the interval

```ts
myInterval.stop();
```

Returns: Boolean - `true` if interval was stopped. Rejects with `false` if interval wasn't running.

**setTime**: While not running set/change the interval length

```ts
myInterval.setTime(intervalLength: Number[, intervalLengthUnit: String])
```

- Number `intervalLength` - the length of each interval
- String `intervalLengthUnit` (optional, default: "ms") - the unit for the length given

Returns: Boolean - `true` if new time was set. Rejects with `false` if interval was running.

**setCallback**: While not running set/change the callback function

```ts
myInterval.setCallback(callback: Function)
```

- Function `callback` - callback function to run on each interval

Returns: Boolean - `true` if new callback was set. Rejects with `false` if interval was running.

### Properties

- `startTime` (Number|null): timestamp of when the interval was started. `null` if it's not currently running
- `running` (Boolean): `true` if the interval is running, `false` if not.

</details>
<details>
<summary>timeout</summary>

## timeout

_v1.2.0+_  
Wrapper class for `setTimeout`

### Methods:

**constructor**: Creates new instance.

```ts
new timeout(callback: Function, timeoutLength: Number[, timeoutLengthUnit: String])
```

- Function `callback` - callback function to run after the timeout finishes
- Number `timerLength` - the length of the timeout
- String `timerLengthUnit` (optional, default: "ms") - the unit for the length given

**start**: Starts the timeout

```ts
myTimeout.start();
```

Returns: Boolean - `true` if timeout was started. Rejects with `false` if timeout was already running.

**stop**: Stops the timeout

```ts
myTimeout.cancel();
```

Returns: Boolean - `true` if timeout was canceled. Rejects with `false` if timeout wasn't running.

**setTime**: While not running set/change the timeout length

```ts
myTimeout.setTime(timeoutLength: Number[, timeoutLengthUnit: String])
```

- Number `timerLength` - the length of the timeout
- String `timerLengthUnit` (optional, default: "ms") - the unit for the length given

Returns: Boolean - `true` if new time was set. Rejects with `false` if timeout was running.

**setCallback**: While not running set/change the callback function

```ts
myTimeout.setCallback(callback: Function)
```

- Function `callback` - callback function to run after the timeout finishes

Returns: Boolean - `true` if new callback was set. Rejects with `false` if timeout was running.

### Properties

- `startTime` (Number|null): timestamp of when the timeout was started. `null` if it's not currently running
- `running` (Boolean): `true` if the timeout is running, `false` if not.

</details>
<details>
<summary>Time units used by interval and timeout</summary>

- Hours as: `"h"`, `"hr"`, `"hrs"`, `"hour"`, `"hours"`
- Minutes as: `"m"`, `"min"`, `"mins"`, `"minute"`, `"minutes"`
- Seconds as: `"s"`, `"sec"`, `"secs"`, `"second"`, `"seconds"`
- Milliseconds as: `"ms"`
- Unrecognized strings are treated as Milliseconds

</details>
<details>
<summary>log (node-only)</summary>

## log

_v1.2.0+, not available for browsers_ (requires package `chalk`)  
Logs any value, objects are printed in prettified json syntax.

```ts
log(value: Any[, maxdepth: Number|false])
```

- Any `value` - Value to log
- Number `maxdepth` (optional, default: false) - maxdepth for objects/arrays. `false` acts like Infinity

</details>

# Changelog

- 1.2.0
  - Added `interval`, `timeout` and `log` modules
  - (Hopefully) fixed errors related to symlinks
- 1.1.x
  - Fixed external dependencies, moved browser builds
