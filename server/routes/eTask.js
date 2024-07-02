const express = require('express');
const TaskModel = require('../models/Tasks');
const router = express.Router();

router.post('/createTask', (req, res) => {
    TaskModel.create(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});

router.get('/task', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});

router.put('/updateTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

router.get('/getTask/:id', (req, res) => {
    const TaskID = req.params.id;
    TaskModel.findById(TaskID)
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

router.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id: id })
        .then(Task => res.json(Task))
        .catch(err => res.json(err));
});

module.exports = router;