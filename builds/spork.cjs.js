'use strict';

var fetch = require('node-fetch');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

/*
 * function range
 *
 * Generates an Array with all Numbers in a specified range
 *
 * Number start - Start value. If this is the only argument this is length instead and the start value will be 0.
 * Number stop (optional, see above) - stop value
 * Number step (optional, default: 1) - steps between values
 * Number maxLength (optional) - maximum number of items in the resulting Array
 *
 * to skip optional arguments please put undefined as the argument.
 *
 * returns Array (or false if no valid values given)
 */
function range(start, stop, step, maxLength) {
    // validate input
    if (isNaN(start)) return false;
    if (isNaN(stop)) {
        stop = start;
        start = 0;
    }
    if (stop < start) [stop, start] = [start, stop];
    if (isNaN(step)) step = 1;

    // calculate length
    let length = (stop - start) / step;
    // DEBUG: console.log(`Calculated length: ${length}`);
    if (!isNaN(maxLength)) length = Math.min(length, maxLength);

    // DEBUG: console.log({start, stop, step, maxLength, length});

    // return array
    return Array(0|length).fill(0).map((_, index) => index * step + start);
}

/*
 * function clamp
 *
 * Equivalent to what Math.clamp will hopefully one day be
 * Returns the best possible value between a value, minimum and maximum
 *
 * Number value - The value to be clamped
 * Number min - The minimum value to be returned
 * Number max - The maximum value to be returned
 *
 * returns Number (or false for invalid arguments)
 */
function clamp(value, min, max) {
    if (isNaN(value) || isNaN(min) || isNaN(max)) return false;
    if (min > value) return min;
    if (max < value) return max;
    return value;
}

let fetchHeader, fetchInit;

fetchHeader = new fetch.Headers();
fetchHeader.append("pragma", "no-cache");
fetchHeader.append("cache-control", "no-cache");

fetchInit = {
    "method": "GET",
    "headers": fetchHeader
};

/*
 * function fetchJson
 *
 * Asynchronous wrapper function for fetch that automatically parses received json data into an object
 *
 * String url - the url to fetch
 * Object|String|Boolean option (optional) - either your custom init, "forceReload" for the provided forceReload header or false
 *
 * returns Object (potentially Array) or false if something went wrong (see error in console)
 */
async function fetchJson(url, option) {
    let response;
    try {
        if (option === "forceReload") {
            response = await fetch__default['default'](url, fetchInit);
        } else if (typeof option === 'object') {
            response = await fetch__default['default'](url, option);
        } else {
            response = await fetch__default['default'](url);
        }
        return await response.json();
    } catch (e) {
        console.error(`Error while fetching: ${e}`);
        return false;
    }
}

const Spork = {
    range,
    clamp,
    fetchJson
};

module.exports = Spork;
