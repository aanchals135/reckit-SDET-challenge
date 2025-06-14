const supertest = require('supertest');
const env = require('../config/env');

describe('API Health Check', () => {
  it('should return API health status', async () => {
    const response = await supertest(env.BASE_URL).get('/health');
    expect(response.statusCode).toBe(200);
  });
});