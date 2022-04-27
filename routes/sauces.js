const express = require ('express');
const router = express.Router();

const multer = require('../middleware/multer')
const sauceControlleur = require('../controllers/sauces')


router.post('/', multer,sauceControlleur.add);
router.get ('/', sauceControlleur.list );



module.exports = router;