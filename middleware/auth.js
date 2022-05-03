//------------AUTENTIFICAZIONE---------------

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_KEY);
      const userId = decodedToken.userId;
      req.auth = { userId: userId};
      
      if(!userId) {
        throw 'User not found !'
      }
      //----------VERIFICARE l'identità dell'utente
      if (req.body.userId && req.body.userId !== userId  ) {
        throw 'User ID non valable !';
      } else {
        next();
      }
        
    } catch {
      res.status(401).json({ 
        error: new Error ('Requête non authentifiée !')
    });
    }
}; 