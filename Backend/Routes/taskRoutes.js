const express = require('express');
const router = express.Router();
const { addProcess, runRoundRobin } = require('../Controllers/taskController');

router.post('/add-process', addProcess);
router.post('/run-round-robin', runRoundRobin);

module.exports = router;
