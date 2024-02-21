let processes = [];

const addProcess = async (req,res) => {
  const {arrivalTime, burstTime} = req.body

  const newProcess = {
    id: processes.length +1,
    arrivalTime: parseInt(arrivalTime),
    burstTime: parseInt(burstTime),
    remainingTime: parseInt(burstTime),
    startTime: null,
    finishTime: null,
    turnaroundTime: null,
  }

  processes.push(newProcess)

  res.status(201).json({ process: newProcess})
}

const runRoundRobin = async (req, res) => {
  const quantum = req.body.quantum 
  if (!quantum || quantum<=0)
  {
    return res.status(400).json({error: 'Invalid Quantum time'})
  }

  let remainingProcesses = [...processes]
  let currentTime = 0
  let completedProcesses = []
  let totalTurnaroundTime = 0

  while (remainingProcesses.length > 0) {
    let processExecuted = false

    for (let i=0; i < remainingProcesses.length; i++) {
      const currentProcess = remainingProcesses[i]

      if(currentProcess.arrivalTime <= currentTime) {
        const executionTime = Math.min(quantum, currentProcess.remainingTime)
        currentProcess.remainingTime -= executionTime
        currentTime += executionTime

        if(currentProcess.remainingTime === 0) {
          currentProcess.finishTime = currentTime;
          currentProcess.turnaroundTime = currentProcess.finishTime - currentProcess.arrivalTime;
          totalTurnaroundTime += currentProcess.turnaroundTime;
        

        completedProcesses.push(currentProcess)
        remainingProcesses.splice(i, 1);

        processExecuted = true

        break;
      }

      processExecuted = true;
      }
    }
        
        if(processExecuted) {
          currentTime++
        }
  }

  const averageTurnaroundTime = totalTurnaroundTime / completedProcesses.length;

  // Send the completed processes and average turnaround time as response
  res.json({completedProcesses, averageTurnaroundTime})
}

module.exports = { addProcess, runRoundRobin };
