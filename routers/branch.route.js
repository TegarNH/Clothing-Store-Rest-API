const express = require('express');
const branchController = require('../controllers/branch.controller');

const router = express.Router();
router.get('/branch-sales-report', branchController.getTotalSalesOfEachBranch);
router.get('/', branchController.getAllBranches);

module.exports = router;
