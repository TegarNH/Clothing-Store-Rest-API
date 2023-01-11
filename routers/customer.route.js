const express = require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();
router.get('/oldest-newest-registrants', customerController.getNewestAndOldestCustomer);
router.get('/top-spending-customers', customerController.getCustomerDataThatSpendTheMost);
router.post('/', customerController.createCustomer);

module.exports = router;
