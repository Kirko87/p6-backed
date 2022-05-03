const Sauces = require('../models/Sauces')
const fs = require('fs');

//-----creare/registrare una salsa
exports.add = (req, res, next) => {
  console.log(req.body);
  const sauces = new Sauces({
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauces.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => {
      console.error(error)
      res.status(400).json({ error })
    }
    );

}

// RECUPERA TUTTE le salse
exports.list = (req, res, next) => {

  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces.map(normalizer));
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//RECUPERA UNA salsa
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id

  }).then(
    (sauce) => {
      res.status(200).json(normalizer (sauce));
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
function normalizer (sauce) {
  return{
    ...sauce.toObject(),
    likes: sauce.usersLiked.length,
    dislikes: sauce.usersDisliked.length
  }
  
}

//MODIFICA una salsa
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};
//ELIMINA una salsa
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//FEEDBACK salse
exports.likesDislikes = async (req, res, next) => {
  try {
    const sauce = await Sauces.findOne({
      _id: req.params.id
    })

    sauce.usersLiked = sauce.usersLiked.filter(userId => userId !== req.body.userId)
    sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId !== req.body.userId)

    const like = req.body.like
    switch (like) {
      case 1:
        sauce.usersLiked.push(req.body.userId)
        break;

      case -1:
        sauce.usersDisliked.push(req.body.userId)
        break;
    }
    await sauce.save()
    res.status(200).json({message:'Valutation ajoutée'})
  }
  catch (error) {
    res.status(400).json({message:'error'})
  }
}

