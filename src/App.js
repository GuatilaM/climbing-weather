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

// function climateListItems(data){
//   let climateBuffer = [];
//   for (let i in data.list){
//     climateBuffer.push(<li key={i}>{convertTime(data.list[i].dt)}</li>);;
//   }
//   return climateBuffer;
// }

function App() {
  const [climateData, setClimateData] = useState({});

  async function getClimate() {
    let latitude = document.querySelector('#i-lat').value;
    let longitude = document.querySelector('#i-lon').value;

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
        setClimateData(climate);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <Autocomplete />
      <LocationInput />
      <button onClick={getClimate}>API</button>
      <ol>
        <ClimateItem climData={climateData} />
      </ol>
    </div>
  );
}

function LocationInput() {
  return (
    <div>
      <label htmlFor="i-lat">Latitude: </label>
      <input id='i-lat' type="text" />
      <label htmlFor="i-lon">Longitude: </label>
      <input id='i-lon' type="text" />
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

export default App;
