const express = require('express');
const router = express.Router();

const controladorHome = require('../controller/homeController');

router.get('/', controladorHome.listar);


module.exports = router;