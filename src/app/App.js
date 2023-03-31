import React from 'react';

import { Map } from '../features/map/Map';
import { WeatherInfo } from '../features/weatherInfo/WeatherInfo';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Map />
        <WeatherInfo />
      </header>
    </div>
  );
}

export default App;
