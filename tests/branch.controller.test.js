const branchTest = () => {
  const request = require('supertest');
  const app = require('../app');
  jest.setTimeout(30000);

  describe('GET /api/branch/branch-sales-report', () => {
    test('It should return 400 if year is not a number', async () => {
      const year = 'test';
      const response = await request(app).get(`/api/branch/branch-sales-report?year=${year}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid parameter type. Expecting number');
    });

    test('It should return the total sales of each branch in the given year', async () => {
      const year = 2022;
      const response = await request(app).get(`/api/branch/branch-sales-report?year=${year}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.message).toBe(`Shows the total sales of each branch in ${year}`);
      expect(Array.isArray(response.body.branch)).toBe(true);
    });
  });

  describe('GET /api/branch/', () => {
    test('It should return all branches in the database', async () => {
      const response = await request(app).get('/api/branch/');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.message).toBe('Show all branches in database');
      expect(Array.isArray(response.body.branches)).toBe(true);
    });
  });
};

module.exports = branchTest;
