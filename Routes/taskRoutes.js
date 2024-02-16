const express = require('express')
const {
    createTask,
    getAllTasks,
    deleteTask,
    runRoundRobin
} = require('../Controllers/taskController')

const router = express.Router()

// Route for creating a new task
router.post('/tasks', createTask);

// Route for getting all tasks
router.get('/tasks', getAllTasks);

// Route for deleting a task by ID
router.delete('/tasks/:id', deleteTask);

// Route for running Round Robin scheduling algorithm
router.get('/roundrobin', runRoundRobin);