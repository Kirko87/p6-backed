const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoute = require ('./routes/sauces');
const cors = require('cors');




app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoute);
app.use('/images');







module.exports = app;