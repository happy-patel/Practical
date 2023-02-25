const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  discount: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product