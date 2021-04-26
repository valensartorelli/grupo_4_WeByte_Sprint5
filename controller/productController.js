let productos = require('../data/datosProductos');

// Leo los elementos del array del archivo data
let productController = {
    leerTodos: function() {
        console.log('leo productos desde data');
        return productos
    },
    index: (req, res) => {
        // leo todo el array de products en el controlador productController
        const listado = productController.leerTodos();
        // envio el array product a la vista para que la recorra EJS
        res.render('product', { listado });
    },
    create: (req, res) => {
        return res.render('alta')
    },
    edit: (req, res) => {
        return res.render('detailEdit')
    }
}

module.exports = productController;