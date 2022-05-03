// impostazione per il programma "password-validator"
var passwordValidator = require('password-validator');
// creazione dello schema
var schemaPassword = new passwordValidator();

//schema
schemaPassword
.is().min(8)                                    // numero MINIMO dei caratteri
.is().max(100)                                  // numero MASSIMO dei caratteri
.has().uppercase()                              // MAIUSCOLE obbligatorie
.has().lowercase()                              // MINUSCOLE obbligatorie
.has().digits(2)                                // minimo 2 cifre
.has().not().spaces()                           // spazi vietati
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist delle passwords

module.exports = (req, res, next) => {
    if(schemaPassword.validate(req.body.password)){
        return next();
    }else{
        return res.status(400).json({error: `mot de passe invalide ${schemaPassword.validate(req.body.password, { list: true })}` })
    }
}
