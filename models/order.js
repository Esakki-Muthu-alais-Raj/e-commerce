// order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
});

module.exports = mongoose.model('Order', orderSchema);