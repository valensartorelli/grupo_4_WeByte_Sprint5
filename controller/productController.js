// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

// Leo los elementos del array del archivo data
let productController = {
    leerTodos: function() {
        console.log('leo productos desde data');
        return productos
    },
    index: (req, res) => {
        // leo todo el array de products en el controlador productController
        const products = productModel.all();
        // envio el array product a la vista para que la recorra EJS
        res.render('product', { products });
    },
    create: (req, res) => {
        return res.render('createProduct')
    },
    edit: (req, res) => {
        let product = productModel.find(req.params.id);
        if (product) {
            res.render('editProduct', { product });
        } else {
            res.render('error404');
        }
    },
    show: (req, res) => {
        const product = productModel.find(req.params.id);
        if (product) {
            res.render('detailEdit', { product });
        } else {
            res.render('error404');
        }
    }
}

module.exports = productController;