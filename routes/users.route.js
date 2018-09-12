'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const client = require('../models/client');
const bcrypt = require('bcryptjs');


//Get all information pertaining to one user.
router.post('/users', (req, res, next) => {
  const { email } = req.body;

  let currentUser = "User Not Found";
  User.find()
    .populate('appointments')
    .populate('clients')
    .then((users) => {
      users.forEach((user) => {
        if (user.email === email) {
          currentUser = user
        }
      })
    })
    .then(() => {
      res.json(currentUser)
    })
    .catch(err => next(err))


});

router.get('/users/:id', (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
  .populate('appointments')
  .populate('clients')
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    next(err);
  });

})

router.put('/users/:id', (req, res, next) => {
  const { id } = req.params;

  const { password } = req.body;
  
  let hashedPassword;
  bcrypt.hash(password, 10).then((result) => {
    hashedPassword = result;
    return hashedPassword
  })

  let newUserInfo;
  User.findById(id)
    .then((result) => {
      newUserInfo = result;
      newUserInfo.password = hashedPassword;
      return newUserInfo;
    })
    .then(() => {
      User.findByIdAndUpdate(id, newUserInfo)
      .then((result) => {
        res.json(newUserInfo);
      })
      .catch(err => next(err))
    })
    .catch(err => next(err))
})



module.exports = router;