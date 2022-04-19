const app = require ("./app")
const port = 3000
const express = require('express');


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://FRANCORAG87:8793BC@cluster0.5t3nl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})