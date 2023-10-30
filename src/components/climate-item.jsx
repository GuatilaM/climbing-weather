function ClimateItem({ climData }) {
    const cdList = climData.list ? climData.list : null;
    let climateBuffer = [];
    if (cdList === null){
        return [];
    }
    for (let i in cdList) {
        climateBuffer.push(
            <li key={i} className='flex-li'>
                <h5 className='fli-content'>{convertTime(cdList[i].dt)}</h5>
                <div className='fli-content'>
                    <p>Temp: {cdList[i].main.temp}</p>
                </div>
                <p className='fli-content'>Precipitation: {cdList[i].pop * 100}%</p>
                <p className="fli-content">Rating: {rateClimate(cdList[i])}</p>
            </li>
        )
        // rateClimate(cdList[i]);
    }
    return (climateBuffer);
}

function convertTime(unixTime) {
    const dateObj = new Date(unixTime * 1000);
    // const utcString = dateObj.toUTCString();
    const localeString = dateObj.toLocaleString(
        'en-US',
        { timeZone: 'America/Bogota' }
    );
    // return utcString;
    return localeString;
}

function rateClimate(data) {
    // console.log(data);
    const pop = data.pop;
    const cloudiness = data.clouds.all;
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    // const snow = data.list.snow ? data.list.snow.3h : 0;
    // Invert probability of precipitation, less is better
    let popRating = percentageToRating((pop * -100) + 100);
    let cloudinessRating = percentageToRating(cloudiness);
    let tempRating = tempToRating(temp);
    let windSpeedRating = windToRating(windSpeed);
    //Invert humidity so that less humidity is better
    let humidityRating = percentageToRating((humidity * -1) + 100);

    const ratings = [
        popRating,
        cloudinessRating,
        tempRating,
        windSpeedRating,
        humidityRating
    ];
    let ratingSum = 0;
    for (let i in ratings){
        ratingSum += ratings[i];
    }
    let meanRating = ratingSum / ratings.length;
    return meanRating;
}

function percentageToRating(percentage){
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

function tempToRating(temp){
    /* 
        Converts a given Celsius temperature into a rating
        taking 14° as the best, or 10, rating.
        The rating decreases the further the temperature is
        from the 14° best temperature. 
    */
    const bestTemp = 14;
    let rating = 10 - Math.abs(temp - bestTemp);
    //Ensure rating is within 1-10 range
    rating = Math.min(10, Math.max(1, rating));
    rating = Math.floor(rating);
    return rating;
}

function windToRating(windSpeed){
    /*
        Converts a wind speed into a rating so that 
        the lower wind speeds get the higher ratings.
        The ratings are based on the Beaufort scale.
    */
    let rating;
    // Convert speed to km/h and ensure it is not lower than 0
    windSpeed = msTokmh(windSpeed);
    windSpeed = Math.max(0, windSpeed);
    // Wind speeds higher than 100km/h get the lowest rating
    if (windSpeed > 100){
        rating = 1
        return rating;
    }

    const beaufortScale = [
        {grade: 1, minSpeed: 0, maxSpeed: 5},
        {grade: 2, minSpeed: 6, maxSpeed: 11},
        {grade: 3, minSpeed: 12, maxSpeed: 19},
        {grade: 4, minSpeed: 20, maxSpeed: 28},
        {grade: 5, minSpeed: 29, maxSpeed: 38},
        {grade: 6, minSpeed: 39, maxSpeed: 49},
        {grade: 7, minSpeed: 50, maxSpeed: 61},
        {grade: 8, minSpeed: 62, maxSpeed: 74},
        {grade: 9, minSpeed: 75, maxSpeed: 88},
        {grade: 10, minSpeed: 89, maxSpeed: 100}
    ];
    const beaufortRange = beaufortScale.find((range) => {
        return windSpeed >= range.minSpeed && windSpeed <= range.maxSpeed;
    });
    // Invert Beaufort grade to get rating
    rating = 11 - beaufortRange.grade;
    return rating;
}

function msTokmh(speed){
    /* Converts a speed from m/s to an integer km/h */
    let kmh = (speed * 3600) / 1000;
    return Math.floor(kmh);
}

export default ClimateItem;