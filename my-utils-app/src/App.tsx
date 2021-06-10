import React, { useState } from 'react';
import './App.css';
import { BloodPressure } from './components/bloodPressure/BloodPressure';
import { Gambling } from './components/gambling/Gambling';
import { Dashboard } from './Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
