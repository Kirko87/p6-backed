const express = require ('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const sauceControlleur = require('../controllers/sauces');

router.post('/', auth, multer,sauceControlleur.add);
router.post('/:id/like', auth, sauceControlleur.likesDislikes);
router.get ('/', auth, sauceControlleur.list);
router.get ('/:id',auth, sauceControlleur.getOneSauce);
router.put ('/:id', auth, multer, sauceControlleur.modifySauce);
router.delete('/:id',auth, sauceControlleur.deleteSauce)

module.exports = router;