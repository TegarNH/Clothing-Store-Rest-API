const express = require('express');
const productSoldController = require('../controllers/productSold.controller');

const router = express.Router();
router.get('/', productSoldController.getAllProductsSold);

module.exports = router;
