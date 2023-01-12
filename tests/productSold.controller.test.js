const productSoldTest = () => {
  const request = require('supertest');
  const app = require('../app');
  jest.setTimeout(30000);

  describe('GET /api/product-sold/', () => {
    test('It should return all products sold in the database', async () => {
      const response = await request(app).get('/api/product-sold');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.message).toBe('Show all Products Sold in database');
      expect(Array.isArray(response.body.productsSold)).toBe(true);
    });
  });
};

module.exports = productSoldTest;
