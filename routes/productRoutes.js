const express = require('express');
const router = express.Router();
const controladorProduct = require('../controller/productController');

router.get('/', controladorProduct.index);

router.get('/create', controladorProduct.create);

router.get('/edit', controladorProduct.edit);

module.exports = router;