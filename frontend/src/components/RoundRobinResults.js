import React, { useState } from 'react';
import axios from 'axios';

const RoundRobinResults = () => {
  const [roundRobinData, setRoundRobinData] = useState(null);
  const [quantum, setQuantum] = useState('');

  const handleRunRoundRobin = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/run-round-robin', {
        quantum: parseInt(quantum), // Convert quantum to integer
      });
      setRoundRobinData(response.data);
    } catch (error) {
      console.error('Error running Round Robin:', error);
    }
  };

  return (
    <div>
      <label>
        Quantum:
        <input type="number" value={quantum} onChange={(e) => setQuantum(e.target.value)} />
      </label>
      <button onClick={handleRunRoundRobin}>Run Round Robin</button>
      {roundRobinData && (
        <div>
          <h2>Round Robin Results</h2>
          <table>
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Turnaround Time</th>
              </tr>
            </thead>
            <tbody>
              {roundRobinData.completedProcesses.map(process => (
                <tr key={process.id}>
                  <td>{process.id}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.turnaroundTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Average Turnaround Time: {roundRobinData.averageTurnaroundTime}</p>
        </div>
      )}
    </div>
  );
};

export default RoundRobinResults;
