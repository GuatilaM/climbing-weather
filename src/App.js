import { useState } from 'react';
import './App.css';
import ClimateForm from './components/climate-form';
import ClimateItem from './components/climate-item';

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

export default App;