const { sequelize } = require('../models');
const customerTest = require('./customer.controller.test');
const productTest = require('./product.controller.test');
const branchTest = require('./branch.controller.test');
const productSoldTest = require('./productSold.controller.test');

afterAll(async () => {
  await sequelize.close();
});

describe('run test sequentially', () => {
  customerTest();
  productTest();
  branchTest();
  productSoldTest();
});
