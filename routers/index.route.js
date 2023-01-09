const express = require('express');
const productRoutes = require('./product.route');
const customerRoutes = require('./customer.route');

const router = express.Router();
router.use('/product', productRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
