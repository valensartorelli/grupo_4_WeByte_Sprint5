let productos = require('../data/datosProductos');

// Leo los elementos del array del archivo data
let productController = {
    leerTodos: function() {
        console.log('leo productos desde data');
        return productos
    }
}

module.exports = productController;