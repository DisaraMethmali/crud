const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Employee
const TaskSchema = new mongoose.Schema({
    workID: {
        type: String,
        unique: true,
        required: true

    },
   

    employeeId: {
        type: String,

    },
    employeeName: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    doneWork: {
        type: String,
    },
    scheduledWork: {
        type: String,
    },
    remainingWork: {
        type: String,
    },
    
});
TaskSchema.pre('save', async function(next) {
    // Hash the password if it exists
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
const TaskModel = mongoose.model('Task', TaskSchema);

// Create the Employee model
module.exports = TaskModel;