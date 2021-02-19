
# Spork.js

![version](https://img.shields.io/github/v/tag/Mitsunee/spork?style=for-the-badge) ![npmversion](https://img.shields.io/npm/v/@mitsunee/spork?style=for-the-badge)  
Spork.js is a collection of small functions that for some reason aren't standard js features yet.

# Usage
**For Browsers**: Download the latest `spork-{version}.js` or `spork-{version}.min.js` from [./builds](https://github.com/Mitsunee/spork/tree/main/builds).  
```html
<script src="spork-0.0.0.js"></script>
```

**For yarn/npm**: Install the package from the registry:  
```bash
npm install --save-dev @mitsunee/spork
```
Import/Require the package:
```js
// All modules
const Spork = require("@mitsunee/spork"); // require OR
import Spork from "@mitsunee/spork"; // ES6 import

// or specific module(s)
const {range, clamp} = require("@mitsunee/spork"); // require OR
import {range, clamp} from "@mitsunee/spork"; // ES6 import
```

# Modules
Spork offers the following Modules:

## clamp
*v1.0.0+*
Equivalent to what Math.clamp will hopefully one day be
Returns the best possible value between a value, minimum and maximum
```ts
clamp(value: Number, min: Number, max: Number): (Number|Boolean)
```

- Number `value` - The value to be clamped
- Number `min` - The minimum value to be returned
- Number `max` - The maximum value to be returned

Returns: Number (or false for invalid arguments)

## fetchJson
*v1.0.0+, async*
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

## range
*v1.0.0+*
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
range(3, undefined, 0.5)
// [ 0, 0.5, 1, 1.5, 2, 2.5 ]
```
Returns: Array (or false if no valid argument was provided)
