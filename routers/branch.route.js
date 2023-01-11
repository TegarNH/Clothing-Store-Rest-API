const express = require('express');
const branchController = require('../controllers/branch.controller');

const router = express.Router();
router.get('/branch-sales/:year', branchController.getTotalSalesOfEachBranch);

module.exports = router;
