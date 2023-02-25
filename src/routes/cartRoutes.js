const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authentication } = require('../middleware/auth');

router.post('/addToCart', authentication, cartController.addToCart);
router.get('/placeOrder', authentication, cartController.placeOrder);

module.exports = router;