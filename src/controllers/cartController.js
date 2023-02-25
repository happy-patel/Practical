const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');

const { errorResponse, successResponse } = require("../utils/helper");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, discount, quantity, price } = req.body;

    const findCart = await CartModel.findOne({ userId }).lean();
    const findProduct = await ProductModel.findOne({ _id: productId });

    if (findProduct.quantity < quantity) {
      return errorResponse(res, 'Dont have enough quantity!', 403)
    }

    const updatedQty = findProduct.quantity - quantity
    await ProductModel.findOneAndUpdate({ _id: productId }, { quantity: updatedQty })
    let cartObj = {
      productId, discount, quantity, price
    }

    let data;
    if (findCart) {
      for (const product of findCart.products) {
        if (JSON.stringify(product.productId) === JSON.stringify(productId)) return errorResponse(res, 'item already exists!', 403)
      }
      data = await CartModel.findOneAndUpdate({ userId }, { $push: { products: cartObj } }, { new: true });
    } else {
      let products = [cartObj];
      cartObj = {
        userId, products
      }
      data = await CartModel.create(cartObj);
    }


    return successResponse(res, data, 'Item added to cart successfull!', 200);
  } catch (error) {
    return errorResponse(res, 'Something went wrong!')
  }
}

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.user;

    const findCart = await CartModel.findOne({ userId }).lean();
    let amount = 0;
    const products = findCart.products

    for (const product of products) {
      let totalAmount = product.price * product.quantity;
      let itemAmount = totalAmount - (totalAmount * (product.discount / 100))
      amount += itemAmount
    }
    const orderObj = {
      userId, products, amount, address, status: 'Pending'
    }

    const data = await OrderModel.create(orderObj);

    await CartModel.deleteOne({ userId });
    return successResponse(res, data, 'Item added to cart successfull!', 201);
  } catch (error) {
    return errorResponse(res, 'Something went wrong!')
  }
}