const productApi = require('../api/productApi');
const env = require('../config/env');

describe('Rate Limiting - Supertest', () => {

  it(`should enforce rate limiting when ${env.RATE_LIMIT_REQUESTS} requests are made rapidly`, async () => {
    const requests = [];

    for (let i = 0; i < env.RATE_LIMIT_REQUESTS; i++) {
      requests.push(
        productApi.listProducts()
          .then(res => res)
          .catch(err => err.response) // In case of HTTP error
      );
    }

    const results = await Promise.all(requests);

    // Optional: log status codes for debugging
    console.log('Received status codes:', results.map(r => r && r.statusCode));

    const hasRateLimit = results.some(
      res => res && res.statusCode === env.RATE_LIMIT_EXPECTED_CODE
    );

    expect(hasRateLimit).toBe(true);
  });

});
