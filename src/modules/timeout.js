import convertTimeUnit from "./methods/convertTimeUnit";

/*
 * Class that wraps setTimeout and provides additional information
 *
 * Function callback - callback function to run after the timeout finishes
 * Number timerLength - the length of the timeout
 * String timerLengthUnit (optional, default: "ms") - the unit for the length given
 */
class timeout {
    constructor(callback, timerLength, timerLengthUnit) {
        this.__clean(); // to set default values
        this.setCallback(callback);
        this.setTime(timerLength, timerLengthUnit);
    }

    /** INTERNAL METHODS **/
    __clean() {
        this.__timerId = null;
        this.running = false;
        this.startTime = null;
    }
    __convert = convertTimeUnit;

    /*
    * Method to start the timeout
    *
    * returns Boolean (True if timeouts was started. Rejects with false if timeout was already running.)
    */
    start() {
        if (this.running) return false;

        this.startTime = Date.now();
        this.__timerId = setTimeout(this.__callback.bind(this), this.__timerLength);
        this.running = true;

        return true;
    }

    /*
    * Method to cancel a timeout that's currently running
    *
    * returns Boolena (True if timeout was canceled. Rejects with false if timeout wasn't running.)
    */
    cancel() {
        if (!this.running) return false;

        clearTimeout(this.__timerId);
        this.__clean();

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
    setTime(timerLength, timerLengthUnit) {
        if (isNaN(Number(timerLength))) throw new TypeError("timerLength must be numerical");
        if (this.running) return false;

        this.__timerLength = this.__convert(timerLength, timerLengthUnit || "ms");

        return true;
    }

    /*
    * Method to set/change the callback function
    *
    * Function callback - callback function to run after the timeout finishes
    *
    * returns Boolean (True if new callback was set. Rejects with false if timeout was running.)
    */
    setCallback(callback) {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (this.running) return false;

        this.__callback = () => {
            this.__clean();
            return callback();
        }

        return true;
    }
}

export default timeout;
