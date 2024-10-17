import WeatherIcon from "./weather-icon";

function CurrentWeather({main}) {
    return (
        <div className="current-weather">
            <h3 className="heading-3">Current weather</h3>
            <div id="cw-general">
                <WeatherIcon />
            </div>
            <div id="cw-details"></div>
        </div>
    );
}

export default CurrentWeather;