const express = require('express');
const app = express();
const puerto = process.env.PORT;
const path = require('path');

const methodOverride = require('method-override');

// Donde estan los gerentes de ruteo
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// para que encuentre las imagenes y css
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

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



app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});