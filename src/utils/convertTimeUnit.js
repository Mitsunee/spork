const convertTimeUnit = (amount, unit) => {
    let conversion;
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
}

export default convertTimeUnit;
