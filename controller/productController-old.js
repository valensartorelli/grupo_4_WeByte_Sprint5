// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const {validationResult} = require('express-validator');

// Leo los elementos del array del archivo data
let productController = {
    leerTodos: function() {
        return productos
    },
    index: (req, res) => {
        // leo todo el array de products en el controlador productController
        const products = productModel.all();
        // envio el array product a la vista para que la recorra EJS
        res.render('products/product', { products });
    },
    create: (req, res) => {
        return res.render('products/createProduct')
    },
    edit: (req, res) => {
        let product = productModel.find(req.params.id);
        if (product) {
            res.render('products/editProduct', { product });
        } else {
            res.render('error404');
        }
    },
    show: (req, res) => {
        const product = productModel.find(req.params.id);
        const categoryArray = ["Hombre", "Mujer", "Niño"];
        if (product) {
            res.render('products/detailEdit', { product, categoryArray });
        } else {
            res.render('error404');
        }
    },
    update: (req, res) => {
        // Armo la estructura del registro auxiliar (product) 
        let  product = req.body;
        product.id = req.params.id;
        product.image = req.file ? req.file.filename : req.body.oldImagen;     
          if (req.body.image===undefined) {
            product.image = product.oldImage
        }  
        // Elimino de la estructura auxiliar
        delete product.oldImage;
        // Delego la responsabilidad al modelo que actualice
        productModel.update(product);
        res.redirect('../../product')
    },
    store: (req, res) => {
        // Atrapo los contenido del formulario
        const product = req.body;
        // Verificar si viene un archivo, para nombrarlo  
        product.image = req.file ? req.file.filename : '';
        // Cuidado sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
        productModel.create(product);
        res.redirect('../../product')
    },
    destroy: (req, res) => {
        productModel.delete(req.params.id);
        res.redirect('../../product')
    },
    cart: (req, res) => {
        res.render('products/productCart');
    },

    search: (req, res) => {

        let dataABuscar = req.query
        res.sed(dataABuscar)
    }
}

module.exports = productController;