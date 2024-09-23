// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/addProduct', productController.addProduct); //add product
router.put('/:productId', productController.updateProduct); //update product
router.delete('/:productId', productController.deleteProduct); // delete product

module.exports = router;