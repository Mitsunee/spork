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

export default clamp;
