let processes = [];
let quantum = 0;

const addProcess = (req, res) => {
  const { burstTime, arrivalTime } = req.body;
  const newProcess = { burstTime, arrivalTime, originalBurstTime:burstTime };
  processes.push(newProcess);
  res.json({ success: true, message: 'Process added successfully' });
};

const setQuantum = (req, res) => {
  const { quantumValue } = req.body;
  quantum = quantumValue;
  res.json({ success: true, message: 'Quantum set successfully' });
};

const calculateProcesses = (req, res) => {
  try {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let remainingProcesses = [...processes];
    let completedProcesses = [];
    let turnaroundSum = 0;
    let waitingSum = 0;

    while (remainingProcesses.length > 0) {
      let process = remainingProcesses.shift();
      let executionTime = Math.min(process.burstTime, quantum);
      
      process.burstTime -= executionTime;
      currentTime += executionTime;

      if (process.burstTime === 0) {
        process.burstTime = process.originalBurstTime
        process.completionTime = currentTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.originalBurstTime;
        turnaroundSum += process.turnaroundTime;
        waitingSum += process.waitingTime;
        completedProcesses.push(process);
      } else {
        remainingProcesses.push(process);
      }
    }

    const avgTurnaroundTime = turnaroundSum / completedProcesses.length;
    const avgWaitingTime = waitingSum / completedProcesses.length;

    res.json({
      success: true,
      processes: completedProcesses,
      avgTurnaroundTime,
      avgWaitingTime,
    });
  } catch (error) {
    console.error('Error calculating processes:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  addProcess,
  setQuantum,
  calculateProcesses,
};
