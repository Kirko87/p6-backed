//-----implementazione DOWLOAD delle immagini
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//configurazione multer
const storage = multer.diskStorage({
  // Destinazione
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Nome del file
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// File img unico
module.exports = multer({storage: storage}).single('image');