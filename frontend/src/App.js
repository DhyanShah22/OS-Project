import React from 'react';
import ProgramForm from './components/ProgramForm';
import RoundRobinResults from './components/RoundRobinResults';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Round Robin CPU Scheduling Simulation</h1>
      <ProgramForm />
      <RoundRobinResults />
    </div>
  );
}

export default App;
