function CurrentWeather({main}) {
    return (
        <div className="current-weather">
            <h1>{main.temp}</h1>
        </div>
    );
}

export default CurrentWeather;