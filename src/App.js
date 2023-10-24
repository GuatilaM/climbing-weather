import { useState } from 'react';
import './App.css';
import Autocomplete from './components/autocomplete';

const apiKey = 'b3622430eaf3b0fc6b012611a087d72f';

// function handleClick(){
//   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${apiKey}`;
//   fetch(url, {
//     mode: 'cors'
//   })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// }

// function climateListItems(data){
//   let climateBuffer = [];
//   for (let i in data.list){
//     climateBuffer.push(<li key={i}>{convertTime(data.list[i].dt)}</li>);;
//   }
//   return climateBuffer;
// }

function App() {
  const [climateData, setClimateData] = useState({});

  return (
    <div className='container'>
      <ClimateForm handleResponse={(climate) => setClimateData(climate)} />
      <ol>
        <ClimateItem climData={climateData} />
      </ol>
    </div>
  );
}

function ClimateForm({ handleResponse }){
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  });

  function handleSelected(city){
    setCoordinates({
      latitude: city.latitude.toString(),
      longitude: city.longitude.toString()
    });
  }

  function handleSubmit(event){
    // Don't submit yet
    event.preventDefault();
    getClimate();
  }

  function updateCoordinates(event, name){
    if (name === 'latitude'){
      setCoordinates({
        ...coordinates,
        latitude: event.target.value
      });
    }
    else if (name === 'longitude'){
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

  return(
    <form action="" onSubmit={handleSubmit} >
        <Autocomplete onSelected={handleSelected} />
        <LocationInput handleChange={updateCoordinates} />
        <button type='submit'>Search</button>
    </form>
  );
}

function LocationInput({ handleChange }) {
  return (
    <div>
      <label htmlFor="i-lat">Latitude: </label>
      <input id='i-lat' type="text" name='latitude' onChange={(event) => handleChange(event, 'latitude')} />
      <label htmlFor="i-lon">Longitude: </label>
      <input id='i-lon' type="text" name='longitude' onChange={(event) => handleChange(event, 'longitude')}/>
    </div>
  );
}

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

export default App;
