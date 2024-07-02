const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../server/routes/eRegister');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://dis:tRPMxJ8vJtPsbbz5@cluster0.l8qlknk.mongodb.net/crud")
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.use(routes);

app.listen(5000, () => {
    console.log(`Server is up and running`);
});