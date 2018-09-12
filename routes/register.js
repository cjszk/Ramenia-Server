'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  const { email, password } = req.body;

  User.find()
    .then((results) => {
      let check = false;
      results.forEach((user) => {
        if (user.email === email) {
          check = true;
        }
      });
      if (check === true) {
        const err = new Error('That email already is already registered!');
        err.status = 400;
        return next(err);
      } 
      else if (password.length < 5) {
        const err = new Error('Password does not meet minimum length requirement.');
        err.status = 400;
        return next(err);
      }
      else {
        return User.hashPassword(password)
          .then(digest => {
            const newUser = {
              email: email,
              password: digest
            };
            User.create(newUser)
              .then((result) => {
                res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
              })
              .catch((err) => next(err));
          });
      }
    });
});

module.exports = router;