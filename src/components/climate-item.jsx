import {rateClimate, Climate} from "../utils/rate-climate";

export default function ClimateItem({ climData }) {
    const cdList = climData.list ? climData.list : null;
    let climateBuffer = [];
    if (cdList === null){
        return [];
    }
    for (let i in cdList) {
        // const climate = new Climate(cdList[i]);
        climateBuffer.push(
            <li key={i} className='flex-li'>
                <h5 className='fli-content'>{convertTime(cdList[i].dt)}</h5>
                <div className='fli-content'>
                    <p>Temp: {cdList[i].main.temp}</p>
                </div>
                <p className='fli-content'>Precipitation: {Math.floor(cdList[i].pop * 100)}%</p>
                <p className="fli-content">Rating: {rateClimate(cdList[i])}</p>
                {/* <p className="fli-content">Rating: {climate.rate()}</p> */}
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