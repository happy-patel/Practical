const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  products: [{
    productId: String,
    discount: Number,
    quantity: Number,
    price: Number
  }],
  amount: {
    type: Number,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);

module.exports = Order