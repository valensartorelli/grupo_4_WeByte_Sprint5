const express = require('express');
const app = express();
const puerto = process.env.PORT;
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');


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
app.use('/users', userRoutes);
app.use('/', homeRoutes);

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);

app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});