import WeatherIcon from "./weather-icon";
import FeelsLike from "./feels-like";
import Humidity from "./humidity";
import Cloudiness from "./cloudiness";
import WindSpeed from "./wind-speed";

function CurrentWeather({data}) {
    return (
        <div className="current-weather">
            <h3 className="heading-3">Current weather</h3>
            <div id="cw-general">
                <WeatherIcon icon={data.weather[0].icon} />
                <h1 className="heading-1-regular">
                    {Math.round(data.main.temp)}°
                </h1>
                <h2 className="heading-2">{data.weather[0].description}</h2>
            </div>
            <div id="cw-details">
                <FeelsLike data={data} />
                <Cloudiness data={data} />
                <Humidity data={data} />
                <WindSpeed data={data} />
            </div>
        </div>
    );
}

export default CurrentWeather;