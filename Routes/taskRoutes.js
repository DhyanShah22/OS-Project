const express = require('express')
const {
    // getAllProcesses,
    // deleteProcess,
    runRoundRobin
} = require('../Controllers/taskController')

const router = express.Router()

// Route for creating a new task
// router.post('/tasks', createProcess);

// Route for getting all tasks
//router.get('/tasks', getAllProcesses);

// Route for deleting a task by ID
// router.delete('/tasks/:id', deleteTask);

// Route for running Round Robin scheduling algorithm
router.post('/roundrobin', runRoundRobin);

module.exports = router