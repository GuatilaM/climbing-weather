function ClimateItem({ climData }) {
    const cdList = climData.list;
    let climateBuffer = [];
    for (let i in cdList) {
        climateBuffer.push(
            <li key={i} className='flex-li'>
                <h5 className='fli-content'>{convertTime(cdList[i].dt)}</h5>
                <div className='fli-content'>
                    <p>Temp: {cdList[i].main.temp}</p>
                </div>
                <p className='fli-content'>Precipitation: {cdList[i].pop}</p>
            </li>
        )
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

export default ClimateItem;