require('dotenv').config();
const mongoose = require('mongoose');
const ProductModel = require('../models/Product');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successfull!');
}).catch((e) => {
    console.log('Connection failed!', e);
})

const seedProducts = [
  {
    title: 'Samsung Galaxy S23 Ultra Mobile',
    description: '12GB RAM',
    price: 80000,
    discount: 10,
    quantity: 5
  },
  {
    title: 'Dell Vostro Leptop',
    description: '512 SSD, 16GB RAM',
    price: 90000,
    discount: 15,
    quantity: 5
  },
  {
    title: 'Iphone 14 Pro Max',
    description: '265GB Storage',
    price: 120000,
    discount: 12,
    quantity: 5
  }
]

const seedDB = async () => {
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(seedProducts);
}

seedDB().then(() => {
  mongoose.connection.close();
})