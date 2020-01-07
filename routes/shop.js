const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');
const router = express.Router();


// shop routes
router.get('/',shopController.getShopHomepage);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart/delete-product',shopController.postDeleteCartProduct);
router.get('/products',shopController.getProducts);
router.post('/create-order',shopController.postOrder);
router.get('/orders',shopController.getOrders);
// // router.get('/checkout',shopController.getCheckout);
// // router.get('/orders',shopController.getOrders);
router.get('/products/:productId',shopController.getProductById);

module.exports = router;