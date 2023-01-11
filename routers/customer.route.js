const express = require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();
router.get('/oldest-newest-registrants', customerController.getNewestAndOldestCustomer);

module.exports = router;
