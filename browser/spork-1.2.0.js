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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  var convertTimeUnit = function convertTimeUnit(amount, unit) {
    var conversion;

    switch (unit) {
      case "h":
      case "hr":
      case "hrs":
      case "hour":
      case "hours":
        conversion = 3600000;
        break;

      case "m":
      case "min":
      case "mins":
      case "minute":
      case "minutes":
        conversion = 60000;
        break;

      case "s":
      case "sec":
      case "secs":
      case "second":
      case "seconds":
        conversion = 1000;
        break;

      default:
        conversion = 1;
    }

    return Number(amount) * conversion;
  };

  /*
   * Class that wraps setTimeout and provides additional information
   *
   * Function callback - callback function to run after the timeout finishes
   * Number timerLength - the length of the timeout
   * String timerLengthUnit (optional, default: "ms") - the unit for the length given
   */

  var _timerId = new WeakMap();

  var _timerLength = new WeakMap();

  var _callback = new WeakMap();

  var _running = new WeakMap();

  var _clean = new WeakMap();

  var _convert = new WeakMap();

  var timeout = /*#__PURE__*/function () {
    function timeout(callback, timerLength, timerLengthUnit) {
      var _this = this;

      _classCallCheck(this, timeout);

      _timerId.set(this, {
        writable: true,
        value: void 0
      });

      _timerLength.set(this, {
        writable: true,
        value: void 0
      });

      _callback.set(this, {
        writable: true,
        value: void 0
      });

      _running.set(this, {
        writable: true,
        value: void 0
      });

      _clean.set(this, {
        writable: true,
        value: function value() {
          _classPrivateFieldSet(_this, _timerId, null);

          _classPrivateFieldSet(_this, _running, false);

          _this.startTime = null;
        }
      });

      _convert.set(this, {
        writable: true,
        value: convertTimeUnit
      });

      _classPrivateFieldGet(this, _clean).call(this); // to set default values


      this.setCallback(callback);
      this.setTime(timerLength, timerLengthUnit);
    }
    /** PRIVATE PROPERTIES **/


    _createClass(timeout, [{
      key: "start",
      value:
      /*
       * Method to start the timeout
       *
       * returns Boolean (True if timeouts was started. Rejects with false if timeout was already running.)
       */
      function start() {
        if (_classPrivateFieldGet(this, _running)) return false;
        this.startTime = Date.now();

        _classPrivateFieldSet(this, _timerId, setTimeout(_classPrivateFieldGet(this, _callback).bind(this), _classPrivateFieldGet(this, _timerLength)));

        _classPrivateFieldSet(this, _running, true);

        return true;
      }
      /*
       * Method to cancel a timeout that's currently running
       *
       * returns Boolena (True if timeout was canceled. Rejects with false if timeout wasn't running.)
       */

    }, {
      key: "cancel",
      value: function cancel() {
        if (!_classPrivateFieldGet(this, _running)) return false;
        clearTimeout(_classPrivateFieldGet(this, _timerId));

        _classPrivateFieldGet(this, _clean).call(this);

        return true;
      }
      /*
       * Method to set/change the timer length
       *
       * Number timerLength - the length of the timeout
       * String timerLengthUnit (optional, default: "ms") - the unit for the length given
       *
       * returns Boolean (True if new time was set. Rejects with false if timeout was running.)
       */

    }, {
      key: "setTime",
      value: function setTime(timerLength, timerLengthUnit) {
        if (isNaN(Number(timerLength))) throw new TypeError("timerLength must be numerical");
        if (_classPrivateFieldGet(this, _running)) return false;

        _classPrivateFieldSet(this, _timerLength, _classPrivateFieldGet(this, _convert).call(this, timerLength, timerLengthUnit || "ms"));

        return true;
      }
      /*
       * Method to set/change the callback function
       *
       * Function callback - callback function to run after the timeout finishes
       *
       * returns Boolean (True if new callback was set. Rejects with false if timeout was running.)
       */

    }, {
      key: "setCallback",
      value: function setCallback(callback) {
        var _this2 = this;

        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (_classPrivateFieldGet(this, _running)) return false;

        _classPrivateFieldSet(this, _callback, function () {
          _classPrivateFieldGet(_this2, _clean).call(_this2);

          return callback();
        });

        return true;
      }
      /*
       * Getter for running property
       */

    }, {
      key: "running",
      get: function get() {
        return _classPrivateFieldGet(this, _running);
      }
    }]);

    return timeout;
  }();

  /*
   * Class that wraps setInterval and provides additional information
   *
   * Function callback - callback function to run on each interval
   * Number intervalLength - the length of each interval
   * String intervalLengthUnit (optional, default: "ms") - the unit for the length given
   */

  var _intervalId = new WeakMap();

  var _intervalLength = new WeakMap();

  var _callback$1 = new WeakMap();

  var _running$1 = new WeakMap();

  var _clean$1 = new WeakMap();

  var _convert$1 = new WeakMap();

  var interval = /*#__PURE__*/function () {
    function interval(callback, intervalLength, intervalLengthUnit) {
      var _this = this;

      _classCallCheck(this, interval);

      _intervalId.set(this, {
        writable: true,
        value: void 0
      });

      _intervalLength.set(this, {
        writable: true,
        value: void 0
      });

      _callback$1.set(this, {
        writable: true,
        value: void 0
      });

      _running$1.set(this, {
        writable: true,
        value: void 0
      });

      _clean$1.set(this, {
        writable: true,
        value: function value() {
          _classPrivateFieldSet(_this, _intervalId, null);

          _classPrivateFieldSet(_this, _running$1, false);

          _this.startTime = null;
        }
      });

      _convert$1.set(this, {
        writable: true,
        value: convertTimeUnit
      });

      _classPrivateFieldGet(this, _clean$1).call(this); // to set default values


      this.setCallback(callback);
      this.setTime(intervalLength, intervalLengthUnit);
    }
    /** PRIVATE PROPERTIES **/


    _createClass(interval, [{
      key: "start",
      value:
      /*
       * Method to start the interval
       *
       * returns Boolean (True if interval was started. Rejects with false if interval was already running.)
       */
      function start() {
        if (_classPrivateFieldGet(this, _running$1)) return false;
        this.startTime = Date.now();

        _classPrivateFieldSet(this, _intervalId, setInterval(_classPrivateFieldGet(this, _callback$1).bind(this), _classPrivateFieldGet(this, _intervalLength)));

        _classPrivateFieldSet(this, _running$1, true);

        return true;
      }
      /*
       * Method to stop the interval
       *
       * returns Boolean (True if interval was stopped. Rejects with false if interval wasn't running.)
       */

    }, {
      key: "stop",
      value: function stop() {
        if (!_classPrivateFieldGet(this, _running$1)) return false;
        clearInterval(_classPrivateFieldGet(this, _intervalId));

        _classPrivateFieldGet(this, _clean$1).call(this);

        return true;
      }
      /*
       * Method to set/change the interval length
       *
       * Number intervalLength - the length of each interval
       * String intervalLengthUnit (optional, default: "ms") - the unit for the length given
       *
       * returns Boolean (True if new time was set. Rejects with false if interval was running.)
       */

    }, {
      key: "setTime",
      value: function setTime(intervalLength, intervalLengthUnit) {
        if (isNaN(Number(intervalLength))) throw new TypeError("intervalLength must be numerical");
        if (_classPrivateFieldGet(this, _running$1)) return false;

        _classPrivateFieldSet(this, _intervalLength, _classPrivateFieldGet(this, _convert$1).call(this, intervalLength, intervalLengthUnit || "ms"));

        return true;
      }
      /*
       * Method to set/change the callback function
       *
       * Function callback - callback function to run on each interval
       *
       * returns Boolean (True if new callback was set. Rejects with false if interval was running.)
       */

    }, {
      key: "setCallback",
      value: function setCallback(callback) {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (_classPrivateFieldGet(this, _running$1)) return false;

        _classPrivateFieldSet(this, _callback$1, callback);

        return true;
      }
      /*
       * Getter for running property
       */

    }, {
      key: "running",
      get: function get() {
        return _classPrivateFieldGet(this, _running$1);
      }
    }]);

    return interval;
  }();

  var fetchHeader, fetchInit; // Header for forceReload option

  fetchHeader = new Headers();
  fetchHeader.append("pragma", "no-cache");
  fetchHeader.append("cache-control", "no-cache");
  fetchInit = {
    method: "GET",
    headers: fetchHeader
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
              if (!(_typeof(option) === "object")) {
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

  exports.clamp = clamp;
  exports.fetchJson = fetchJson;
  exports.interval = interval;
  exports.range = range;
  exports.timeout = timeout;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
