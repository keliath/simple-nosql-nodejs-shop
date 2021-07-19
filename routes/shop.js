const express = require('express');

const shopController = require('../controllers/shop');
const router = express.Router();

router.get('/', shopController.getHome);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteItem);

// router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

module.exports = router;