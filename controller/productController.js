// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');

const {validationResult} = require('express-validator');

let productController = {
    // lista todos los productos
    listar: (req, res) => {
        console.log('entro listado de productos')
        const products = productModel.all();
        res.render('products/product', { products });
    },
    // lista todos los productos categoria hombre
    listarMen: (req, res) => {
        const products = productModel.findAllByField();
        res.render('products/product', { products });
    },
// Función que muestra el formulario de Alta de Productos
create: (req, res) => {
    console.log('form para alta de producto')
    res.render('products/createProduct');
},
// Función que simula el almacenamiento, en este caso en array
store: (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.render('products/createProduct', {
            errors: errors.mapped(),
            oldData: req.body
        });
    }

  //  return res.send('Ok, las validaciones se pasaron y no tienes errores');
  else {
const product = req.body;
product.image = req.file ? req.file.filename : '';

 // pregunta si vienen datos de color y talle en el body, en caso de false devuelve un  array vacio
 product.color = product.color ? product.color : [];
 product.talle = product.talle ? product.talle : [];

 // Convierte en array los datos de color y talle en el caso que venga 1 solo dato en los checkboxes del body
 if (typeof product.color === 'string') {
     product.color = [product.color];
 };
 
 if (typeof product.talle === 'string') {
     product.talle = [product.talle];
 };
 
productModel.create(product);
res.redirect('../../product')
}
},

    // Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: (req, res) => {
        const product = productModel.find(req.params.id);
        console.log(product)
        if (product) {
            res.render('products/detailEdit', { product });
        } else {
            res.render('error404');
        }
    },
    // FUnción que muestra el formulario de edición
    edit: (req, res) => {
       // Delego al modelo que busque el producto     
       let product = productModel.find(req.params.id);
       const categoryArray = ["Hombre", "Mujer", "Niños"];
       if (product) {
           res.render('products/editProduct', { product, categoryArray });
       } else {
           res.render('error404');
       }
   },
    // Función que realiza cambios en el producto seleccionado
    update: (req, res) => {
        console.log("Entré al update de product")
       // Validacion de campos - se pregunta si existió al menos un error
        const errors = validationResult(req);

        console.log('imprimo errores')
        console.log(errors);
     // la función mapped convierte un array en objeto literal
        if (errors.errors.length > 0) {
            return res.render('products/editProduct', {
                 // aca productId es lo que envio a la vista
                productId : req.params.id,
                errors: errors.mapped(),
                oldData: req.body
            });
        }
        // Armo la estructura del registro auxiliar (product) 
        let  product = req.body;
      
       // SI no se envía foto nueva, req.body.image no viene definido
       if (req.file===undefined) {
        // quiere decir que no se cambia la foto   
        product.image = req.body.oldImage
         // Elimino de la estructura auxiliar, porque no existe en Json
        // Ojo este campo viene de la vista 
      //  delete product.oldImage;
    } else {
        // Actualizaron la foto, saco su nombre del proceso
        product.image = req.file.filename 
    }

    delete product.oldImage;
    
    product.news = req.body.news == "true" ? true : false;
    // pregunta si vienen datos de color y talle en el body, en caso de false devuelve un  array vacio
    product.color = product.color ? product.color : [];
    product.talle = product.talle ? product.talle : [];

    // Convierte en array los datos de color y talle en el caso que venga 1 solo dato en los checkboxes del body
    if (typeof product.color === 'string') {
        product.color = [product.color];
    };

    if (typeof product.talle === 'string') {
        product.talle = [product.talle];
    };

    product.id = req.params.id;
    productModel.update(product);         
          
        res.redirect('../../product', )
    },

    // Función que elimina del Array visitados el producto seleccionado
    destroy: (req, res) => {
        console.log('entre destroy')
        productModel.delete(req.params.id);
    // Ahora se mostrará todo porque los productos los varga de un archivo       
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

module.exports = productController