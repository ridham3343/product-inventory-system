const request = require('supertest');
const app = require('../server'); // Import your app

describe('Products API', () => {
  test('POST /api/products creates product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        category: 'Electronics',
        price: 100,
        quantity: 5
      });
    
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Product');
  });
});