const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    discount: Number,
    quantity: Number,
    price: Number
  }]
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart