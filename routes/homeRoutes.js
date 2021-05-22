const express = require('express');
const router = express.Router();

const controladorHome = require('../controller/homeController');

//router.get('/', controladorHome.listar);

router.get('/', (req, res) =>
    res.render('index')
);

module.exports = router;