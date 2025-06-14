const api = require('./apiClient');

const listProducts = () =>
    api.get('/api/products').set('Authorization', `Bearer ${process.env.TOKEN}`);

const listProductsPaginated = (page = 1, limit = 5) =>
    api.get(`/api/products?page=${page}&page_size=${limit}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);

const getProduct = (id) =>
    api.get(`/api/products/${id}`).set('Authorization', `Bearer ${process.env.TOKEN}`);

const createProduct = (data) =>
    api.post('/api/products').set('Authorization', `Bearer ${process.env.TOKEN}`).send(data);

const updateProduct = (id, data) =>
    api.put(`/api/products/${id}`).set('Authorization', `Bearer ${process.env.TOKEN}`).send(data);

const deleteProduct = (id) =>
    api.delete(`/api/products/${id}`).set('Authorization', `Bearer ${process.env.TOKEN}`);

module.exports = {
    listProducts,
    listProductsPaginated,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
