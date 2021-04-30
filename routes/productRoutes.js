const express = require('express');
const router = express.Router();
const controladorProduct = require('../controller/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', controladorProduct.index);

router.get('/create', controladorProduct.create);

router.get('/:id/edit', controladorProduct.edit);

router.get('/:id', controladorProduct.show);

module.exports = router;