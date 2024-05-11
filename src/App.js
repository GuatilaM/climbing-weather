import { useState } from 'react';
import './App.css';
import ClimateForm from './components/climate-form';
import ClimateItem from './components/climate-item';
import Welcome from './components/welcome';

function App() {
  const [climateData, setClimateData] = useState({});
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  return (
    <div className='container'>
      <ClimateForm handleResponse={(climate) => setClimateData(climate)} handleFocus={() => {setIsSearchFocus(true)}} />
      <Welcome hide={isSearchFocus} />
      <ol>
        <ClimateItem climData={climateData} />
      </ol>
    </div>
  );
}

export default App;