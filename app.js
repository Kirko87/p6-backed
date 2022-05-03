const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoute = require ('./routes/sauces');
const cors = require('cors');
const path = require('path');


require('dotenv').config();

app.use(cors());
app.use(express.json());



app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));






module.exports = app;