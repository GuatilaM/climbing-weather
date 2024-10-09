import { useState } from 'react';
import './App.css';
import ClimateForm from './components/climate-form';
import ClimateItem from './components/climate-item';
import Welcome from './components/welcome';
import Logo from './components/logo';

function App() {
  const [forecastData, setForecastData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isSuggestionActive, setIsSuggestionActive] = useState(false);

  return (
    <div className='container'>
      <Logo />
      <ClimateForm 
        handleForecastResponse={(forecast) => setForecastData(forecast)} 
        handleWeatherResponse={(weather) => setWeatherData(weather)} 
        handleSuggestionActive={(isActive) => {setIsSuggestionActive(isActive)}}
      />
      <Welcome hide={isSuggestionActive} />
      <ol>
        <ClimateItem climData={forecastData} />
      </ol>
    </div>
  );
}

export default App;