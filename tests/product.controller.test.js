const productTest = () => {
  const request = require('supertest');
  const app = require('../app');
  jest.setTimeout(30000);

  describe('GET /api/product/highest-lowest-prices', () => {
    test('It should return product data with the highest and lowest prices', async () => {
      const response = await request(app).get('/api/product/highest-lowest-prices');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.highestPricedProduct).toBeDefined();
      expect(response.body.lowestPricedProduct).toBeDefined();
    });
  });

  describe('GET /api/product/top-selling-products', () => {
    test('It should return 400 status if month or year is not a number', async () => {
      const month = 1;
      const year = 'test';
      const res = await request(app).get(`/api/product/top-selling-products?month=${month}&year=${year}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid query type. Expecting number');
    });

    test('It should return 400 status if month or year is not between 1-12', async () => {
      const month = 34;
      const year = 2022;
      const res = await request(app).get(`/api/product/top-selling-products?month=${month}&year=${year}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
      expect(res.body).toHaveProperty('message', 'The month query must be a number from 1 to 12');
    });

    test('It should return 200 status and the most purchased product data by month and year', async () => {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const res = await request(app).get(`/api/product/top-selling-products?month=${month}&year=${year}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'Success');
      expect(res.body).toHaveProperty('message', `Displays the most purchased products in month ${month} of ${year} in each branch`);
      expect(res.body).toHaveProperty('branch');
    });
  });

  describe('GET /api/product/increase-in-product-sales', () => {
    it('should return products that have increased sales compared to the previous month', async () => {
      const date = '2022-12-01';
      const response = await request(app).get(`/api/product/increase-in-product-sales?date=${date}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.result).toBeDefined();
      expect(response.body.result[0].increase).toBeGreaterThan(0);
    });

    it('should return error if date is not provided', async () => {
      const response = await request(app).get('/api/product/increase-in-product-sales');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.result).toBeDefined();
      expect(response.body.result[0].increase).toBeGreaterThan(0);
    });

    it('should return error if date is invalid', async () => {
      const date = 'sefe';
      const response = await request(app).get(`/api/product/increase-in-product-sales?date=${date}`);

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('Error');
      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /api/product/', () => {
    test('It should return all products in the database', async () => {
      const response = await request(app).get('/api/product/');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.message).toBe('Show all products in database');
      expect(Array.isArray(response.body.products)).toBe(true);
    });
  });
};

module.exports = productTest;
