const request = require('supertest');
const env = require('../config/env');

const api = request.agent(env.BASE_URL);

module.exports = api;
