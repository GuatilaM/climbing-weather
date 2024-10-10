import { useState } from 'react';
import './App.css';
import Logo from './components/logo';
import ClimateForm from './components/climate-form';
import Content from './components/content';
import ClimateItem from './components/climate-item';

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
      <Content hideWelcome={isSuggestionActive} climData={forecastData} /> 
      <ol>
        <ClimateItem climData={forecastData} />
      </ol>
    </div>
  );
}

export default App;