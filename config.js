'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
  //Need to create mlab database
        process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: '7d'
};