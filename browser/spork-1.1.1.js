(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Spork = {}));
}(this, (function (exports) { 'use strict';

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

      if (stop < start) {
        var _ref = [start, stop];
        stop = _ref[0];
        start = _ref[1];
      }

      if (isNaN(step)) step = 1; // calculate length

      var length = (stop - start) / step; // DEBUG: console.log(`Calculated length: ${length}`);

      if (!isNaN(maxLength)) length = Math.min(length, maxLength); // DEBUG: console.log({start, stop, step, maxLength, length});
      // return array

      return Array(0 | length).fill(0).map(function (_, index) {
        return index * step + start;
      });
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

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    var fetchHeader, fetchInit;
    fetchHeader = new Headers();
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
     * Object|Boolean option (optional) - either your custom init, "forceReload" for the provided forceReload header or false
     *
     * returns Object (potentially Array) or false if something went wrong (see error in console)
     */

    function fetchJson(_x, _x2) {
      return _fetchJson.apply(this, arguments);
    }

    function _fetchJson() {
      _fetchJson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, option) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(option === "forceReload")) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return fetch(url, fetchInit);

              case 4:
                response = _context.sent;
                _context.next = 16;
                break;

              case 7:
                if (!(_typeof(option) === 'object')) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return fetch(url, option);

              case 10:
                response = _context.sent;
                _context.next = 16;
                break;

              case 13:
                _context.next = 15;
                return fetch(url);

              case 15:
                response = _context.sent;

              case 16:
                _context.next = 18;
                return response.json();

              case 18:
                return _context.abrupt("return", _context.sent);

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](0);
                console.error("Error while fetching: ".concat(_context.t0));
                return _context.abrupt("return", false);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 21]]);
      }));
      return _fetchJson.apply(this, arguments);
    }

    var Spork = {
      range: range,
      clamp: clamp,
      fetchJson: fetchJson
    };

    exports.Spork = Spork;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
