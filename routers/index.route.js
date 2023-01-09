const express = require('express');
const productRoutes = require('./product.route');

const router = express.Router();
router.use('/product', productRoutes);

module.exports = router;
