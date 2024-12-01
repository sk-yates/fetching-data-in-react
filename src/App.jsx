import { useState, useEffect } from 'react';

import * as weatherService from './services/weatherService'

import WeatherSearch from './components/WeatherSearch';

import WeatherDetails from './components/WeatherDetails';

const App = () => {

  const [weather, setWeather] = useState({});

  const fetchData = async (city) => {
    const data = await weatherService.show(city);
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };
    setWeather(newWeatherState);
  };

  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await weatherService.show('Newcastle');
      
      const newWeatherState = {
        location: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
      };
      setWeather(newWeatherState);
    };
    fetchDefaultData();
  }, []); // An empty dependency array

  /* 
  - If the dependency array is left out, the side effect function runs after every render.

  - If the dependency array is empty ([]), the side effect function runs once after the initial render.
  
  - If dependencies are included, the side effect function runs whenever the dependency data changes.
  */



  // The following log should be outside of the fetchData function
  console.log('State:', weather);

  return (
    <main>
      <h1>Weather API</h1>
      <WeatherSearch fetchData={fetchData} />
      <WeatherDetails weather={weather} />
    </main>
  );
};

export default App;

