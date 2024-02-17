const express = require('express')

const runRoundRobin = (req, res) => {
    try {
        const { arrivalTimes, burstTimes, quantum } = req.body;

        if (!arrivalTimes || !burstTimes || !quantum || arrivalTimes.length !== burstTimes.length) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        let n = arrivalTimes.length;
        let remainingBurstTime = [...burstTimes];
        let completionTime = new Array(n).fill(0);
        let currentTime = 0;
        let queue = [];

        while (true) {
            let done = true;
            for (let i = 0; i < n; i++) {
                if (arrivalTimes[i] <= currentTime) {
                    if (remainingBurstTime[i] > 0) {
                        done = false;
                        let executionTime = Math.min(quantum, remainingBurstTime[i]);
                        currentTime += executionTime;
                        remainingBurstTime[i] -= executionTime;
                        if (remainingBurstTime[i] === 0) {
                            completionTime[i] = currentTime;
                        } else {
                            queue.push(i); // Add process index to the queue if not completed
                        }
                    }
                } else {
                    break; // No process is available at this time
                }
            }
            if (done && queue.length === 0)
                break;

            if (queue.length > 0) {
                currentTime++;
                let nextProcessIndex = queue.shift();
                queue.push(nextProcessIndex);
            }
        }

        res.json(completionTime);
    } catch (err) {
        console.error('Error running Round Robin:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    runRoundRobin
};

