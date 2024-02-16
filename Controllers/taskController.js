const express = require('express')
const { default: mongoose} = require('mongoose')

const Task = require('../Models/roundModels')

const createTask = async (req, res) => {
    try {
        const { name, burstTime } = req.body;
        const task = new Task({ name, burstTime });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const runRoundRobin = async (req, res) => {
    try {
        // Retrieve all tasks from the database
        const tasks = await Task.find();

        // Define quantum time slice (adjust as needed)
        const quantum = 3;

        // Clone the tasks array to avoid mutating the original array
        const remainingTasks = [...tasks];
        const completedTasks = [];

        // Initialize time and current index
        let time = 0;
        let currentIndex = 0;

        while (remainingTasks.length > 0) {
            const currentTask = remainingTasks[currentIndex];

            // Execute the task for the quantum time slice
            if (currentTask.burstTime > quantum) {
                // If task's burst time is greater than the quantum, execute for quantum time slice
                time += quantum;
                currentTask.burstTime -= quantum;
            } else {
                // If task's burst time is less than or equal to the quantum, execute until completion
                time += currentTask.burstTime;
                currentTask.burstTime = 0;
                currentTask.completionTime = time;
                completedTasks.push(currentTask);
                remainingTasks.splice(currentIndex, 1);
            }

            // Move to the next task
            currentIndex = (currentIndex + 1) % remainingTasks.length;
        }

        // Return the completed tasks as the response
        res.json(completedTasks);
    } catch (err) {
        console.error('Error running Round Robin:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    runRoundRobin,
    deleteTask,
    createTask,
    getAllTasks
}