const express = require('express');
const app = express();
const puerto = process.env.PORT;
const path = require('path');

// Donde estan los gerentes de ruteo
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// le decimos cual es la carpeta publica
const publicPath = path.join(__dirname, './public');
// para que encuentre las imagenes y css
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) =>
    res.render('index')
);

app.get('/login', (req, res) =>
    res.render('login')
);

app.get('/register', (req, res) =>
    res.render('register')
);

app.get('/detalleProducto', (req, res) =>
    res.render('productDetail')
);

app.get('/carrito', (req, res) =>
    res.render('productCart')
);

app.get('/plantilla', (req, res) =>
    res.render('plantilla')
);

app.get('/entrega', (req, res) =>
    res.render('entrega')
);

app.get('/edit', (req, res) =>
    res.render('editProduct')
);

app.get('/create', (req, res) =>
    res.render('createProduct')
);

app.get('/editId', (req, res) =>
    res.render('detailEdit')
);



app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});