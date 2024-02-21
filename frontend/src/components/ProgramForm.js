import React, { useState } from 'react';
import axios from 'axios';

const ProgramForm = ({ onAddProcess }) => {
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/add-process', {
        arrivalTime: parseInt(arrivalTime),
        burstTime: parseInt(burstTime)
      });
      onAddProcess(response.data.process);
      setArrivalTime('');
      setBurstTime('');
    } catch (error) {
      console.error('Error adding process:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Arrival Time:
        <input type="number" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
      </label>
      <label>
        Burst Time:
        <input type="number" value={burstTime} onChange={(e) => setBurstTime(e.target.value)} required />
      </label>
      <button type="submit">Add Process</button>
    </form>
  );
};

export default ProgramForm;
