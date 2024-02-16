const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    burstTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'completed'],
        default: 'pending'
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    waitingTime: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema);
