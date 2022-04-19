const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const cors = require('cors');


app.use(cors());
app.use('/api/auth', userRoutes)
app.use(express.json());








module.exports = app;