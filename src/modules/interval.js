import convertTimeUnit from "./methods/convertTimeUnit";

/*
 * Class that wraps setInterval and provides additional information
 *
 * Function callback - callback function to run on each interval
 * Number intervalLength - the length of each interval
 * String intervalLengthUnit (optional, default: "ms") - the unit for the length given
 */
class interval {
    constructor(callback, intervalLength, intervalLengthUnit) {
        this.#clean(); // to set default values
        this.setCallback(callback);
        this.setTime(intervalLength, intervalLengthUnit);
    }

    /** PRIVATE PROPERTIES **/
    #intervalId;
    #intervalLength;
    #callback;
    #running;

    /** INTERNAL METHODS **/
   #clean = () => {
        this.#intervalId = null;
        this.#running = false;
        this.startTime = null;
    }
   #convert = convertTimeUnit;

    /*
     * Method to start the interval
     *
     * returns Boolean (True if interval was started. Rejects with false if interval was already running.)
     */
    start() {
        if (this.#running) return false;

        this.startTime = Date.now();
        this.#intervalId = setInterval(this.#callback.bind(this), this.#intervalLength);
        this.#running = true;

        return true;
    }

    /*
     * Method to stop the interval
     *
     * returns Boolean (True if interval was stopped. Rejects with false if interval wasn't running.)
     */
    stop() {
        if (!this.#running) return false;

        clearInterval(this.#intervalId);
        this.#clean();

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
    setTime(intervalLength, intervalLengthUnit) {
        if (isNaN(Number(intervalLength))) throw new TypeError("intervalLength must be numerical");
        if (this.#running) return false;

        this.#intervalLength = this.#convert(intervalLength, intervalLengthUnit || "ms");

        return true;
    }

    /*
     * Method to set/change the callback function
     *
     * Function callback - callback function to run on each interval
     *
     * returns Boolean (True if new callback was set. Rejects with false if interval was running.)
     */
    setCallback(callback) {
        if (typeof callback !== "function") throw new TypeError("callback must be a function");
        if (this.#running) return false;

        this.#callback = callback;

        return true;
    }

    /*
     * Getter for running property
     */
    get running() {
        return this.#running;
    }
}

export default interval;
