const customerTest = () => {
  const request = require('supertest');
  const app = require('../app');
  jest.setTimeout(30000);

  describe('GET /api/oldest-newest-registrants', () => {
    test('It should return error if idBranch is not provided', async () => {
      const response = await request(app).get('/api/customer/oldest-newest-registrants');

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('status', 'Error');
      expect(response.body).toHaveProperty('message', 'the idBranch query is required');
    });

    test('It should return error if idBranch is not a number', async () => {
      const idBranch = 'abs';
      const response = await request(app).get(`/api/customer/oldest-newest-registrants?idBranch=${idBranch}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid query type. Expecting number');
    });

    test('It should return error if idBranch not found', async () => {
      const idBranch = 45;
      const response = await request(app).get(`/api/customer/oldest-newest-registrants?idBranch=${idBranch}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('status', 'Error');
      expect(response.body).toHaveProperty('message', 'idBranch not found');
    });

    test('It should return the newest and oldest customer data by branch', async () => {
      const idBranch = 1;
      const response = await request(app).get(`/api/customer/oldest-newest-registrants?idBranch=${idBranch}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'Success');
      expect(response.body).toHaveProperty('newestCustomer');
      expect(response.body).toHaveProperty('oldestCustomer');
    });
  });

  describe('GET /api/top-spending-customers', () => {
    test('It should return error if month is not a number', async () => {
      const month = 'tes';
      const year = 2022;
      const response = await request(app).get(`/api/customer/top-spending-customers?month=${month}&year=${year}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid query type. Expecting number' });
    });

    test('It should return error if month is not between 1 and 12', async () => {
      const month = 43;
      const year = 2022;
      const response = await request(app).get(`/api/customer/top-spending-customers?month=${month}&year=${year}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ status: 'error', message: 'The month query must be a number from 1 to 12' });
    });

    test('It should return customer data that spend the most in the given month and year', async () => {
      const month = 1;
      const year = 2022;
      const response = await request(app).get(`/api/customer/top-spending-customers?month=${month}&year=${year}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.branch).toBeDefined();
    });
  });

  describe('POST /api/customer/', () => {
    test('It should return a 404 status if request body is incomplete', async () => {
      const response = await request(app)
        .post('/api/customer/')
        .send({
          idBranch: 1,
          name: 'Tegar Naufal Hanip',
          phone: '0852234558729',
        });

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('Failed');
      expect(response.body.message).toBe('the data in the request body is incomplete');
    });

    test('It should return error if idBranch is not a number', async () => {
      const res = await request(app)
        .post('/api/customer/')
        .send({
          idBranch: 'abc',
          name: 'Tegar Naufal Hanip',
          address: 'Villa 2',
          phone: '0852234558729',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'Invalid idBranch data type. Expecting number',
      });
    });

    test('It should return error if idBranch not found', async () => {
      const res = await request(app)
        .post('/api/customer/')
        .send({
          idBranch: 4,
          name: 'Tegar Naufal Hanip',
          address: 'Villa 2',
          phone: '0852234558729',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'Error');
      expect(res.body).toHaveProperty('message', 'idBranch not found');
    });

    test('It should create a customer and return 201 status', async () => {
      const response = await request(app)
        .post('/api/customer/')
        .send({
          idBranch: 1,
          name: 'Tegar Naufal Hanip',
          address: 'Villa 2',
          phone: '0852234558729',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Customer created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('idBranch', 1);
      expect(response.body.data).toHaveProperty('name', 'Tegar Naufal Hanip');
      expect(response.body.data).toHaveProperty('address', 'Villa 2');
      expect(response.body.data).toHaveProperty('phone', '0852234558729');
    });
  });

  describe('GET /api/customer/', () => {
    test('It should return all customers in the database', async () => {
      const response = await request(app).get('/api/customer/');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Success');
      expect(response.body.message).toBe('Show all customers in database');
      expect(Array.isArray(response.body.customers)).toBe(true);
    });
  });
};

module.exports = customerTest;
