import { useState } from 'react';
import './App.css';
import ClimateForm from './components/climate-form';
import ClimateItem from './components/climate-item';
import Welcome from './components/welcome';

function App() {
  const [forecastData, setForecastData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  return (
    <div className='container'>
      <ClimateForm 
        handleForecastResponse={(forecast) => setForecastData(forecast)} 
        handleWeatherResponse={(weather) => setWeatherData(weather)}
        handleFocus={() => {setIsSearchFocus(true)}}
        handleBlur={() => {setIsSearchFocus(false)}} 
      />
      <Welcome hide={isSearchFocus} />
      <ol>
        <ClimateItem climData={forecastData} />
      </ol>
    </div>
  );
}

export default App;