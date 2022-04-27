const Sauces =require('../models/Sauces')
const fs = require('fs');

exports.add=(req, res, next) => {
    console.log(req.body);
    const sauces = new Sauces({
      ...JSON.parse (req.body.sauce),
      imageUrl: req.file.filename
    });
    sauces.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => {
        console.error(error)  
        res.status(400).json({ error })
      }
      );
      
  }

  exports.list = (req, res, next) => {
    Sauces.find().then(
   (sauces) => {
        res.status(200).json( sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

 

  exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };