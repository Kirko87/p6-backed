// importazione di bcrypt per l'hash della password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importazione del modello
const User = require('../models/User');

//signup per accedere come nuovo utilizzatore
exports.signup = async (req, res, next) => {
    try {
      //console.log(req.body);  
      const hash = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        email: req.body.email,
        password: hash
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé !'})
    } catch(error) {
       console.error(error) 
      res.status(400).json({error}) 
    }
  }
//login per accedere come utilizzatore esistente
exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
       if (!user) {
           return res.status(401).json({ error: 'Utilisateur non trouvé !'});
       }
       bcrypt.compare(req.body.password, user.password)
         .then(valid => {
             if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
             }
             res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id},
                    process.env.RANDOM_SECRET_KEY,
                    { expiresIn: '24h'}
                )
             });
         })
         .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
};