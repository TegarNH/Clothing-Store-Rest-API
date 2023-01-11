const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();
router.get('/highest-lowest-prices', productController.getHighestAndLowestProductPrice);
router.get('/top-selling-products', productController.getMostPurchasedPruductData);
router.get('/increase-in-product-sales', productController.getProductsThatHaveIncreasedSales);

module.exports = router;
