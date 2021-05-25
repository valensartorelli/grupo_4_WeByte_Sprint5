// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

let homeController = {
    index: (req, res) => {
        // leo todo el array de products en el controlador productController
        const products = productModel.all();
        // envio el array product a la vista para que la recorra EJS
        res.render('index', { products });
    },
    listar: (req, res) => {
         const products = productModel.all();
         let news = [];
 
         // Con el siguiente código, se filtran los productos por state. Con límite de max 5 por categoría.
 
         products.forEach((element, i) => {
             if ( element.news === true) {
                 if ( news.length < 8 ) {
                     news.push(element);
                 }
             } 
         });
 
         return res.render('index', { news})
     }
}

module.exports = homeController;