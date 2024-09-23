// orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.placeOrder);
router.put('/:orderId/cancel', orderController.cancelOrder);

module.exports = router;