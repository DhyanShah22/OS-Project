const express = require('express');
const router = express.Router();
const {
    addProcess,
    setQuantum,
    calculateProcesses
} = require('../Controllers/taskController')

router.post('/process', addProcess);
router.post('/process/setQuantum', setQuantum)
router.get('/process/calculate', calculateProcesses);

module.exports = router;
