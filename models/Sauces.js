const mongoose = require('mongoose');

const sauces= mongoose.Schema({
   userId:{ type: String, required: true },
   name: { type: String, required: true },
   manufacturer: { type: String, required: true },
   description: { type: String, required: true },
   mainPepper: { type: String, required: true },
   imageUrl: { type: String, required: true },
   heat: {type: Number, required: true },
   //likes:  {type: Number, required: true, default: 0 },   //creano problemi con la route POST creazione salse!
   //dislikes:  {type: Number, required: true, default: 0 },
   usersLiked: {type: [String], required: true, default: []},
   usersDisliked: {type: [String], required: true, default: []}
});

module.exports = mongoose.model('Sauces', sauces);