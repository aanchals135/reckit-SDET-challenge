const dotenv = require('dotenv');
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

dotenv.config({ path: envFile });

module.exports = {
  BASE_URL: process.env.BASE_URL,
  TOKEN: process.env.TOKEN,
  RATE_LIMIT_REQUESTS: parseInt(process.env.RATE_LIMIT_REQUESTS, 10) || 30,
  RATE_LIMIT_EXPECTED_CODE: parseInt(process.env.RATE_LIMIT_EXPECTED_CODE, 10) || 429,
};
