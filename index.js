const app = require ("./app")
const port = 3000
require('dotenv').config();
const helmet = require ('helmet')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(helmet())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})