const productApi = require('../api/productApi');

describe('Negative & Edge Cases', () => {
  it('should fail without auth', async () => {
    const supertest = require('supertest');
    const env = require('../config/env');
    const res = await supertest(env.BASE_URL).get('/api/products');
    expect(res.statusCode).toBe(401);
  });

  it('should return 404 for invalid product', async () => {
    const res = await productApi.getProduct('invalid-id');
    console.log(res.body)
    expect(res.body.message === "Invalid ID format" ).toBeTruthy();
  });

  it('should handle invalid name', async () => {
    const res = await productApi.createProduct({ name: '' });
    console.log(res.body)
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should handle invalid price', async () => {
    const res = await productApi.createProduct({ name: 'Test Product', price: -1 });
    console.log(res.body)
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('should handle invalid stock', async () => {
    const res = await productApi.createProduct({ name: 'Test Product', price: 1, stock: -1 });
    console.log(res.body)
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

});