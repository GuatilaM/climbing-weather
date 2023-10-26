import { useState } from "react";
import Autocomplete from "./autocomplete";
import LocationInput from "./location-input";

function ClimateForm({ handleResponse }) {
    const [coordinates, setCoordinates] = useState({
        latitude: '',
        longitude: ''
    });

    function handleSelected(city) {
        setCoordinates({
            latitude: city.latitude.toString(),
            longitude: city.longitude.toString()
        });
    }

    function handleSubmit(event) {
        // Don't submit yet
        event.preventDefault();
        getClimate();
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

    async function getClimate() {
        let latitude = coordinates.latitude;
        let longitude = coordinates.longitude;

        if (latitude === '' || longitude === '') {
            latitude = '4.6535';
            longitude = '-74.0836';
        }

        const apiKey = 'b3622430eaf3b0fc6b012611a087d72f';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const options = {
            mode: 'cors'
        }

        try {
            const response = await fetch(url, options);
            const climate = await response.json();
            if (climate.cod !== '200') {
                throw new Error(climate.message);
            } else {
                console.log(climate);
                handleResponse(climate);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action="" onSubmit={handleSubmit} >
            <Autocomplete onSelected={handleSelected} />
            <LocationInput handleChange={updateCoordinates} />
            <button type='submit'>Search</button>
        </form>
    );
}

export default ClimateForm;