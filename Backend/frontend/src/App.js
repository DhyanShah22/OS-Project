import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Plot from 'react-plotly.js';

function App() {
  const [burstTime, setBurstTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [quantumValue, setQuantumValue] = useState('');
  const [processes, setProcesses] = useState([]);
  const [completedProcesses, setCompletedProcesses] = useState([]);
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState('');
  const [avgWaitingTime, setAvgWaitingTime] = useState('');
  const [ganttChartData, setGanttChartData] = useState([]);

  const handleAddProcess = () => {
    const newProcess = { burstTime, arrivalTime };
    axios.post('http://localhost:7000/api/process', newProcess)
      .then(response => {
        console.log(response.data); // Handle success response
        setProcesses([...processes, newProcess]);
      })
      .catch(error => {
        console.error('Error adding process:', error); // Handle error
      });
    setBurstTime('');
    setArrivalTime('');
  };

  const handleSetQuantum = () => {
    const data = { quantumValue };
    axios.post('http://localhost:7000/api/process/setQuantum', data)
      .then(response => {
        console.log(response.data); // Handle success response
      })
      .catch(error => {
        console.error('Error setting quantum:', error); // Handle error
      });
    setQuantumValue('');
  };

  const handleCalculateProcesses = () => {
    axios.get('http://localhost:7000/api/process/calculate')
      .then(response => {
        console.log(response.data); // Handle success response
        const { processes, avgTurnaroundTime, avgWaitingTime } = response.data;
        setCompletedProcesses(processes);
        setAvgTurnaroundTime(avgTurnaroundTime);
        setAvgWaitingTime(avgWaitingTime);

        // Prepare data for the Gantt chart
        const ganttData = processes.map((process, index) => ({
          x: [new Date(0), new Date(process.completionTime)],
          y: [index + 1, index + 1],
          type: 'scatter',
          mode: 'lines',
          name: `Process ${process.id}`,
          line: { color: 'blue', width: 20 }, // Adjust line color and width as needed
        }));
        setGanttChartData(ganttData);
      })
      .catch(error => {
        console.error('Error calculating processes:', error); // Handle error
      });
  };

  return (
    <div className="App">
      <h1>Round Robin Algorithm</h1>
      <div>
        <h2>Add Process</h2>
        <input
          type="number"
          placeholder="Burst Time"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <button onClick={handleAddProcess}>Add Process</button>
      </div>
      <div>
        <h2>Set Quantum</h2>
        <input
          type="number"
          placeholder="Quantum Value"
          value={quantumValue}
          onChange={(e) => setQuantumValue(e.target.value)}
        />
        <button onClick={handleSetQuantum}>Set Quantum</button>
      </div>
      <div>
        <h2>Calculate Processes</h2>
        <button onClick={handleCalculateProcesses}>Calculate</button>
      </div>
      <div>
        <h2>Process Table</h2>
        <table>
          <thead>
            <tr>
              <th>Burst Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.burstTime}</td>
                <td>{process.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Completed Processes</h2>
        <table>
          <thead>
            <tr>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {completedProcesses.map((process, index) => (
              <tr key={index}>
                <td>{process.burstTime}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.completionTime}</td>
                <td>{process.turnaroundTime}</td>
                <td>{process.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Average Turnaround Time: {avgTurnaroundTime}</h2>
        <h2>Average Waiting Time: {avgWaitingTime}</h2>
      </div>
      <div>
        <h2>Gantt Chart</h2>
        <Plot
          data={ganttChartData}
          layout={{
            title: 'Gantt Chart',
            xaxis: {
              type: 'date',
              title: 'Time',
            },
            yaxis: {
              autorange: 'reversed',
              title: 'Processes',
              tickvals: processes.map((_, index) => index + 1),
              ticktext: processes.map((_, index) => `Process ${index + 1}`),
            },
          }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
}

export default App;

