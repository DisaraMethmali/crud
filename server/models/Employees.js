const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Employee
const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

// Hash the password before saving
EmployeeSchema.pre('save', async function(next) {
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Create the Employee model
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;