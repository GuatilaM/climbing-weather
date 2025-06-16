import * as weatherIcons from "./icons-modules/weather-icons";

function WeatherIcon({icon}){
    switch (icon){
        case '01d':
            return(<weatherIcons.WI01d />);
        case '01n':
            return(<weatherIcons.WI01n />);
        case '02d':
            return(<weatherIcons.WI02d />);
        case '02n':
            return(<weatherIcons.WI02n />);
        case '03d':
        case '03n':
            return (<weatherIcons.WI03d />);
        case '04d':
        case '04n':
            return(<weatherIcons.WI04d />);
        case '09d':
        case '09n':
            return (<weatherIcons.WI09d />);
        case '10d':
        case '10n':
            return (<weatherIcons.WI10d />);
        case '11d':
        case '11n':
            return (<weatherIcons.WI11d />);
        case '13d':
        case '13n':
            return (<weatherIcons.WI13d />);
        case '50d':
        case '50n':
            return (<weatherIcons.WI50d />);
        default:
            return(<weatherIcons.WI01d />);
    }
} 

export default WeatherIcon;