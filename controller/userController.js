// ESTO SERIA EL GESTOR DEL MODELO
const User= require('../model/User');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

let userController = {
    register: (req, res) => {
        return res.render('users/register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        // aca busca que el mail no exita ya registrado
        let userInDB = User.findByField('email', req.body.email);
        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
        //si paso las validaciones crea el usuario y encripta la contraseña
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate);
        return res.redirect('/users/login');
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    loginProcess: (req, res) => {
        // busca el usuario x email su lo encuentra compara contraseña
        let userToLogin = User.findByField('email', req.body.email);
        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                return res.redirect('/users/profile');
            } 
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('users/profile', {
           // user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        //res.clearCookie('userEmail');
        //req.session.destroy();
        return res.redirect('/');
    }
}
module.exports = userController