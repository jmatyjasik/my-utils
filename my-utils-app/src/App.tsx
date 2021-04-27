import React, { useState } from 'react';
import './App.css';
import { BloodPressure } from './components/bloodPressure/BloodPressure';
import { Gambling } from './components/gambling/Gambling';

function App() {
  return (
    <div className="App">
      {/* <BloodPressure></BloodPressure> */}
      <Gambling></Gambling>
    </div>
  );
}

export default App;
