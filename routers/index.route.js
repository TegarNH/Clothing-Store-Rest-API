const express = require('express');
const productRoutes = require('./product.route');
const customerRoutes = require('./customer.route');
const branchRoutes = require('./branch.route');
const productSoldRoutes = require('./productSold.route');

const router = express.Router();
router.use('/product', productRoutes);
router.use('/customer', customerRoutes);
router.use('/branch', branchRoutes);
router.use('/product-sold', productSoldRoutes);

module.exports = router;
