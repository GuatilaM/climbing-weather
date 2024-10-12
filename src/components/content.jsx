import Welcome from "./welcome";
import CurrentWeather from "./current-weather";

function Content({hideWelcome, climData, currentWeatherData}) {
    // const climDataList = climData.list ? climData.list : null;
    const wdMain = currentWeatherData.main ? currentWeatherData.main : null;
    if (wdMain === null){
        return (
            <div>
                <Welcome hide={hideWelcome} />
            </div>
        );
    }
    return (
        <div>
            <CurrentWeather main={wdMain} />
        </div>
    );
}

export default Content;