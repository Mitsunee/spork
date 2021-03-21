
# Spork.js

![version](https://img.shields.io/github/v/tag/Mitsunee/spork?style=for-the-badge) ![npmversion](https://img.shields.io/npm/v/@mitsunee/spork?style=for-the-badge)  
Spork.js is a collection of small functions that for some reason aren't standard js features yet.

https://www.npmjs.com/package/@mitsunee/spork

# Usage
**Via yarn/npm**: Install the package from the registry:  
```bash
npm install --save-dev @mitsunee/spork
# or
yarn add -D @mitsunee/spork
```
Spork contains separate packages for the module and browser version. If you are using Spork in a browser please specify this during the import. The module version is also further split so that both `require` and ES6 `import` will work.

Import the package:
```js
// All modules
const Spork = require("@mitsunee/spork"); // for node scripts
import Spork from "@mitsunee/spork"; // for node script modules
import Spork from "@mitsunee/spork/browser"; // for in-browser use

// or specific module(s)
const {range, clamp} = require("@mitsunee/spork"); // for node scripts
import {range, clamp} from "@mitsunee/spork"; // for node script modules
import {range, clamp} from "@mitsunee/spork/browser"; // for in-browser use
```

**For Browsers**: If you are not using npm/yarn you can also download the latest `spork-{version}.js` or `spork-{version}.min.js` from [./browser](https://github.com/Mitsunee/spork/tree/main/browser) and include it manually.
```html
<script src="spork-1.1.2.min.js"></script>
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

# Changelog

- 1.2.0
	- Added `interval` and `timeout`
	- (Hopefully) fixed errors related to symlinks
- 1.1.x
	- Fixed external dependencies, moved browser builds
