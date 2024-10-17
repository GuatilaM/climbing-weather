import WeatherIcon from "./weather-icon";

function CurrentWeather({data}) {
    return (
        <div className="current-weather">
            <h3 className="heading-3">Current weather</h3>
            <div id="cw-general">
                <WeatherIcon icon={data.weather[0].icon} />
            </div>
            <div id="cw-details">{data.weather[0].icon}</div>
        </div>
    );
}

export default CurrentWeather;