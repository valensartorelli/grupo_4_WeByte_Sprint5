const express = require('express');
const router = express.Router();
const controladorProduct = require('../controller/productController');

const upload = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateCreateProducts');
const validationsEdit = require('../middlewares/validateEditProducts');

router.get('/', controladorProduct.listar);

router.get('/men', controladorProduct.listarMen);

router.get('/woman', controladorProduct.listarWoman);

router.get('/boy', controladorProduct.listarBoy);

router.get('/create', controladorProduct.create);

router.get('/cart', controladorProduct.cart);

router.get('/:id/edit', controladorProduct.edit);

router.get('/:id', controladorProduct.show);

// Acción de edición (a donde se envía el formulario) (PUT)
router.put('/:id', upload.single('image'), validationsEdit, controladorProduct.update);

// Acción de borrado (DELETE)
router.delete('/:id', controladorProduct.destroy);

// Acción de creación (a donde se envía el formulario) (POST)
router.post('/store', upload.single('image'), validations, controladorProduct.store);

module.exports = router;