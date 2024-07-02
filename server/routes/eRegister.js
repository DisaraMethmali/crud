const express = require('express');
const EmployeeModel = require('../models/Employees');
const TaskModel = require('../models/Tasks');
const LeaveModel = require("../models/Leaves");
const auth = require('./auth');
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const csv = require('csv-parser');
const fs = require('fs');
const DataModel = require("../models/Data");
const router = express.Router();


router.post('/createEmployee', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

router.post('/createTask', (req, res) => {
    TaskModel.create(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
router.get('/', (req, res) => {
    EmployeeModel.find({})
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});
router.get('/task', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
router.put('/updateEmployee/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});
router.put('/updateTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

router.get('/getEmployee/:id', (req, res) => {
    const employeeId = req.params.id;
    EmployeeModel.findById(employeeId)
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});
router.get('/getTask/:id', (req, res) => {
    const TaskID = req.params.id;
    TaskModel.findById(TaskID)
        .then(Task => res.json(Task))
        .catch(err => res.json(err));
});

router.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id: id })
        .then(Task => res.json(Task))
        .catch(err => res.json(err));
});
router.delete('/deleteEmployee/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete({ _id: id })
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});
router.get('/workhour', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
router.post('/submitLeave', (req, res) => {
    LeaveModel.create(req.body)
        .then(leaves => res.json(leaves))
        .catch(err => res.json(err));
});
router.get('/leave', (req, res) => {
    LeaveModel.find({})
        .then(leaves => res.json(leaves))
        .catch(err => res.json(err));
});


router.put('/leave/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    // Assuming you have a MongoDB model for leaves

    // Find the leave by ID and update its status
    LeaveModel.findByIdAndUpdate({ _id: id }, { status }, { new: true })
        .then(updatedLeave => {
            res.json(updatedLeave);
        })
        .catch(err => {
            console.error('Error updating leave status:', err);
            res.status(500).json({ error: 'Error updating leave status' });
        });
});



router.get('/data', (req, res) => {
    const dataList = [];
    fs.createReadStream('Data/data.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Assuming your CSV file has columns 'Timestamp', 'Employee ID', and 'Date'
            const data = new DataModel({
                timestamp: row.Timestamp,
                employeeId: row['Employee ID'],
                date: row.Date
            });
            dataList.push(data);
        })
        .on('end', () => {
            res.json(dataList);
        });
});
// Secret keys for JWT
const secretKeys = {


    duvini_2001: process.env.DUVINI_2001_KEY || 'duvini_2001_secret',
    hasintha_2002: process.env.HASINTHA_2002_KEY || 'hasintha_2002_secret',
    disara_2001: process.env.DISARA_2001_KEY || 'disara_2001_secret',
    rivin_2001: process.env.RIVIN_2001_KEY || 'rivin_2001_secret',
    username_2001: process.env.USERNAME_2001_KEY || 'username_2001_secret',
    username_2002: process.env.USERNAME_2002_KEY || 'username_2002_secret',
    username_2003: process.env.USERNAME_2003_KEY || 'username_2003_secret',
};

// User Signup
router.post('/users', async(req, res) => {
    try {
        // Extract user input from request body
        const { firstName, lastName, email, password } = req.body;

        // Validate user input (you can use Joi for validation)
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Generate unique JWT key for the user based on email domain
        let jwtKey;
        if (email.endsWith('@duvini@gmail.com')) {
            jwtKey = process.env.DUVINI_2001_KEY || 'duvini_2001_secret';
        } else if (email.endsWith('@hasintha.com')) {
            jwtKey = process.env.HASINTHA_2002_KEY || 'hasintha_2002_secret';
        } else if (email.endsWith('@disaramethmali2001@gmail.com')) {
            jwtKey = process.env.DISARA_2001_KEY || 'disara_2001_secret';
        } else if (email.endsWith('@rivin.com')) {
            jwtKey = process.env.RIVIN_2001_KEY || 'rivin_2001_secret';
        } else {
            // Default JWT key if email domain doesn't match
            jwtKey = 'default_secret_key';
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            jwtKey // Assign the JWT key to the user
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token for the user
        const token = jwt.sign({ _id: user._id, email: user.email }, jwtKey, { expiresIn: '7d' });

        // Respond with success message and token
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
// User Login
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: 'User not found' });

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });
        //Generate JWT token with a secret key
        const token = jwt.sign({ payload: 'data' }, 'secret_key_here', { expiresIn: '1h' });
        // Generate JWT token using appropriate key
        let jwtPrivateKey;
        switch (email) {
            case 'duvini@example.com':
                jwtPrivateKey = process.env.DUVINI_2001_KEY;
                break;
            case 'hasintha@example.com':
                jwtPrivateKey = process.env.HASINTHA_2002_KEY;
                break;
            case 'disara@example.com':
                jwtPrivateKey = process.env.DISARA_2001_KEY;
                break;
            case 'rivin@example.com':
                jwtPrivateKey = process.env.RIVIN_2001_KEY;
                break;
            default:
                jwtPrivateKey = process.env.DEFAULT_KEY; // Set a default key if needed
        }


        res.send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
// Get user profile
router.get('/profile', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        // Return user profile
        res.send({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
                // Add other profile data as needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
module.exports = router;