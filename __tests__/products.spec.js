const productApi = require('../api/productApi');

describe('Product API Tests', () => {
  let createdProductId;

  it('should create a new product', async () => {
    const product = { name: 'Test Product', price: 99 };
    const res = await productApi.createProduct(product);
    expect(res.statusCode === 200 || res.statusCode === 201).toBeTruthy();
    console.log(res.body, "Create product")
    createdProductId = res.body.product.id;
  });

  it('should list products', async () => {
    const res = await productApi.listProducts();
    expect(res.statusCode).toBe(200);
  });


  it('should get product by ID', async () => {
    const res = await productApi.getProduct(createdProductId);
    expect(res.statusCode).toBe(200);
    expect(res.body.product.id).toBe(createdProductId);
  });

  it('should update product', async () => {
    const res = await productApi.updateProduct(createdProductId, { name: 'Updated Product' });
    expect(res.statusCode).toBe(200);
  });

  it('should get product by ID', async () => {
    const res = await productApi.getProduct(createdProductId);
    console.log(res.body, "Get after updatetttt")
    expect(res.statusCode).toBe(200);
  });

  it('should delete product', async () => {
    const res = await productApi.deleteProduct(createdProductId);
    console.log(res.body)
    expect(res.statusCode).toBe(204);
  });

    it('should get product by ID', async () => {
    const res = await productApi.getProduct(createdProductId);
    console.log(res.body, "Get after delete")
    expect(res.statusCode).toBe(404);
  });

  it('should return paginated products list', async () => {
    const limit = 5;

    // Page 1
    const resPage1 = await productApi.listProductsPaginated(1, limit)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(resPage1.body.products)).toBe(true);
    expect(resPage1.body.products.length).toBeLessThanOrEqual(limit);

    // Page 2
    const resPage2 = await productApi.listProductsPaginated(2, limit)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(resPage2.body.products)).toBe(true);
    expect(resPage2.body.products.length).toBeLessThanOrEqual(limit);

    // Optionally: check that Page 1 and Page 2 are not identical
    if (resPage1.body.products.length > 0 && resPage2.body.products.length) {
      expect(resPage1.body.products[0].id).not.toBe(resPage2.body.products[0].id);
    }
  });

});