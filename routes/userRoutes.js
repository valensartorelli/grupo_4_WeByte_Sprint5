const express = require('express');
const router = express.Router();
const usersController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const upload = require('../middlewares/multerMiddlewareUser');
const validationLogin = require('../middlewares/validateLogin');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/create', (req, res) =>
    res.render('users/createUser')
);

// Formulario de registro despues agregar, 
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', upload.single('avatar'), validations, usersController.processRegister);


// Formulario de login despues agregar, 
router.get('/login', validationLogin, guestMiddleware, usersController.login);
// Procesar el login
router.post('/login', usersController.loginProcess);
// Perfil de Usuario, 
router.get('/profile/', authMiddleware, usersController.profile);
// Logout
router.get('/logout/', usersController.logout);




module.exports = router;