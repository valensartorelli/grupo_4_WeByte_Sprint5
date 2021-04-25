const express = require('express');
const router = express.Router();
const controladorProduct = require('../controller/productController');

router.get('/', (req, res) => {
    // leo todo el array de products en el controlador productController
    const listado = controladorProduct.leerTodos();
    // envio el array product a la vista para que la recorra EJS
    console.log('volvi del controlador')

    res.render('product', { listado });
})

module.exports = router;