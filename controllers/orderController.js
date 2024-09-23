// orderController.js
const Order = require('../models/order');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Update product quantities
    for (const productItem of order.products) {
      const product = await Product.findById(productItem.productId);
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.quantity < productItem.quantity) {
        throw new Error('Insufficient product quantity');
      }

      product.quantity -= productItem.quantity;
      await product.save();
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status to canceled
    order.status = 'canceled';
    await order.save();

    // Restore product quantities (optional)
    for (const productItem of order.products) {
      const product = await Product.findById(productItem.productId);
      if (product) {
        product.quantity += productItem.quantity;
        await product.save();
      }
    }

    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
