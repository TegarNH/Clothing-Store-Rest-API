const express = require('express');
const productRoutes = require('./product.route');
const customerRoutes = require('./customer.route');
const branchRoutes = require('./branch.route');

const router = express.Router();
router.use('/product', productRoutes);
router.use('/customer', customerRoutes);
router.use('/branch', branchRoutes);

module.exports = router;
