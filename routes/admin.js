const path = require('path');
const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/edit-product/:productId',adminController.getEditProduct);
router.post('/edit-product/:productId',adminController.postEditProduct);
router.post('/delete-product/:productId',adminController.postDeleteProduct);
router.get('/products',adminController.getAdminProducts); // /admin/products


module.exports = router;
