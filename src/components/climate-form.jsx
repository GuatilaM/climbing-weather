import { useState } from "react";
import Autocomplete from "./autocomplete";
import LocationInput from "./location-input";

function ClimateForm({ 
    handleForecastResponse, 
    handleWeatherResponse, handleSuggestionActive 
}) {
    const [coordinates, setCoordinates] = useState({
        latitude: '',
        longitude: ''
    });

    const apiKey = 'b3622430eaf3b0fc6b012611a087d72f';

    function handleSelected(city) {
        setCoordinates({
            latitude: city.latitude.toString(),
            longitude: city.longitude.toString()
        });
    }

    function handleSubmit(event) {
        // Don't submit yet
        event.preventDefault();
        getForecast();
        getWeather();
    }

    function updateCoordinates(event, name) {
        if (name === 'latitude') {
            setCoordinates({
                ...coordinates,
                latitude: event.target.value
            });
        }
        else if (name === 'longitude') {
            setCoordinates({
                ...coordinates,
                longitude: event.target.value
            });
        }
    }

    async function getForecast() {
        let latitude = coordinates.latitude;
        let longitude = coordinates.longitude;

        if (latitude === '' || longitude === '') {
            latitude = '4.6535';
            longitude = '-74.0836';
        }

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const options = {
            mode: 'cors'
        }

        try {
            const response = await fetch(forecastUrl, options);
            const forecast = await response.json();
            if (forecast.cod !== '200') {
                throw new Error(forecast.message);
            } else {
                console.log(forecast);
                handleForecastResponse(forecast);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getWeather() {
        let latitude = coordinates.latitude;
        let longitude = coordinates.longitude;

        if (latitude === '' || longitude === ''){
            latitude = '4.6535';
            longitude = '-74.0836';
        }

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const options = {
            mode: 'cors'
        }

        try {
            const response = await fetch(weatherUrl, options);
            const weather = await response.json();
            if (weather.cod !== 200){
                throw new Error(weather.message);
            } else {
                console.log(weather);
                handleWeatherResponse(weather);
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <form action="" onSubmit={handleSubmit} >
            <Autocomplete onSelected={handleSelected} handleSuggestionListActive={handleSuggestionActive} />
            <LocationInput handleChange={updateCoordinates} />
            <button type='submit' hidden={true}>Search</button>
        </form>
    );
}

export default ClimateForm;