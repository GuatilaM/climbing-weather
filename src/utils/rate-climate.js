export class Climate {
    constructor(data) {
        //Invert probability of precipitation, less is better
        this.pop = (data.pop * -100) + 100;
        this.cloudiness = data.clouds.all;
        this.temp = data.main.temp;
        this.windSpeed = data.wind.speed;
        //Invert humidity, less is better
        this.humidity = (data.main.humidity * -1) + 100;
        this.snow = data.snow ? data.snow : 0;
    }

    ratePercentage(percentage) {
        /* 
            Converts a percentage into a rating
            by the decile it is in. So that each decile
            from 0 to 100 maps to a rating from 1 to 10.
        */
        //Ensure percentage is within 0-100 range
        percentage = Math.min(100, Math.max(0, percentage));
        let rating = Math.ceil(percentage / 10);
        //Ensure rating is within 1-10 range
        rating = Math.min(10, Math.max(1, rating));
        return rating;
    }

    rateTemp() {
        /* 
            Converts a given Celsius temperature into a rating
            taking 14° as the best, or 10, rating.
            The rating decreases the further the temperature is
            from the 14° best temperature. 
        */
        const bestTemp = 14;
        let rating = 10 - Math.abs(this.temp - bestTemp);
        //Ensure rating is within 1-10 range
        rating = Math.min(10, Math.max(1, rating));
        rating = Math.floor(rating);
        return rating;
    }

    rateWind() {
        /*
            Converts a wind speed into a rating so that 
            the lower wind speeds get the higher ratings.
            The ratings are based on the Beaufort scale.
        */
        let windSpeed = this.windSpeed
        let rating;
        // Convert speed to km/h and ensure it is not lower than 0
        windSpeed = msTokmh(windSpeed);
        windSpeed = Math.max(0, windSpeed);
        // Wind speeds higher than 100km/h get the lowest rating
        if (windSpeed > 100) {
            rating = 1
            return rating;
        }

        const beaufortScale = [
            { grade: 1, minSpeed: 0, maxSpeed: 5 },
            { grade: 2, minSpeed: 6, maxSpeed: 11 },
            { grade: 3, minSpeed: 12, maxSpeed: 19 },
            { grade: 4, minSpeed: 20, maxSpeed: 28 },
            { grade: 5, minSpeed: 29, maxSpeed: 38 },
            { grade: 6, minSpeed: 39, maxSpeed: 49 },
            { grade: 7, minSpeed: 50, maxSpeed: 61 },
            { grade: 8, minSpeed: 62, maxSpeed: 74 },
            { grade: 9, minSpeed: 75, maxSpeed: 88 },
            { grade: 10, minSpeed: 89, maxSpeed: 100 }
        ];
        const beaufortRange = beaufortScale.find((range) => {
            return windSpeed >= range.minSpeed && windSpeed <= range.maxSpeed;
        });
        // Invert Beaufort grade to get rating
        rating = 11 - beaufortRange.grade;
        return rating;
    }

    rate() {
        const ratings = [
            this.ratePercentage(this.pop),
            this.ratePercentage(this.cloudiness),
            this.rateTemp(),
            this.rateWind(),
            this.ratePercentage(this.humidity),
            this.snow ? 1 : 10
        ];

        let ratingSum = 0;
        for (let i in ratings){
            ratingSum += ratings[i];
        }
        let meanRating = ratingSum / ratings.length;
        return meanRating.toFixed(1);
    }
}
/**
 * Returns a 1-10 rating on how favorable a climate is to climb outdoors.
 * @param {*} data Dictionary of climate data with pop, cloudiness, temp, wind speed, humidity, and snow.
 * @returns 1-10 rating
 */
export function rateClimate(data) {
    // Invert probability of precipitation, less is better
    const pop = (data.pop * -100) + 100;
    const cloudiness = data.clouds.all;
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    //Invert humidity so that less humidity is better
    const humidity = (data.main.humidity * -1) + 100;
    const snow = data.snow ? data.snow : 0;

    const ratings = [
        percentageToRating(pop),
        percentageToRating(cloudiness),
        tempToRating(temp),
        windToRating(windSpeed),
        percentageToRating(humidity),
        snow ? 1 : 10
    ];

    let ratingSum = 0;
    for (let i in ratings) {
        ratingSum += ratings[i];
    }
    let meanRating = ratingSum / ratings.length;
    return meanRating.toFixed(1);
}
/**
 * Converts a percentage into a rating by the decile it is in. So that each decile from 0 to 100 maps to a rating from 1 to 10.
 * @param {*} percentage A percentage value to convert
 * @returns rating
 */
function percentageToRating(percentage) {
    //Ensure percentage is within 0-100 range
    percentage = Math.min(100, Math.max(0, percentage));
    let rating = Math.ceil(percentage / 10);
    //Ensure rating is within 1-10 range
    rating = Math.min(10, Math.max(1, rating));
    return rating;
}
/**
 * Converts a given Celsius temperature into a rating taking 14° as the best, or 10, rating. The ranking decreases the further the temperature is from the 14° best temperature.
 * @param {*} temp Temperature value, in Celsius, to convert
 * @returns rating
 */
function tempToRating(temp) {
    const bestTemp = 14;
    let rating = 10 - Math.abs(temp - bestTemp);
    //Ensure rating is within 1-10 range
    rating = Math.min(10, Math.max(1, rating));
    rating = Math.floor(rating);
    return rating;
}
/**
 * Converts a wind speed into a rating so that the lower wind speeds get the higher ratings. The raings are based on the Beaufort scale.
 * @param {*} windSpeed Wind speed value, in m/s, to convert. 
 * @returns rating
 */
function windToRating(windSpeed) {
    let rating;
    // Convert speed to km/h and ensure it is not lower than 0
    windSpeed = msTokmh(windSpeed);
    windSpeed = Math.max(0, windSpeed);
    // Wind speeds higher than 100km/h get the lowest rating
    if (windSpeed > 100) {
        rating = 1
        return rating;
    }

    const beaufortScale = [
        { grade: 1, minSpeed: 0, maxSpeed: 5 },
        { grade: 2, minSpeed: 6, maxSpeed: 11 },
        { grade: 3, minSpeed: 12, maxSpeed: 19 },
        { grade: 4, minSpeed: 20, maxSpeed: 28 },
        { grade: 5, minSpeed: 29, maxSpeed: 38 },
        { grade: 6, minSpeed: 39, maxSpeed: 49 },
        { grade: 7, minSpeed: 50, maxSpeed: 61 },
        { grade: 8, minSpeed: 62, maxSpeed: 74 },
        { grade: 9, minSpeed: 75, maxSpeed: 88 },
        { grade: 10, minSpeed: 89, maxSpeed: 100 }
    ];
    const beaufortRange = beaufortScale.find((range) => {
        return windSpeed >= range.minSpeed && windSpeed <= range.maxSpeed;
    });
    // Invert Beaufort grade to get rating
    rating = 11 - beaufortRange.grade;
    return rating;
}
/**
 * Converts a speed from m/s to an integer km/h
 * @param {*} speed Speed in m/s to convert to km/h.
 * @returns Speed in km/h.
 */
function msTokmh(speed) {
    let kmh = (speed * 3600) / 1000;
    return Math.floor(kmh);
}