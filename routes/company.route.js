'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/company');

router.get('/company', (req, res, next) => {
    Company.find()
        .then((result) => res.json(result))
        .catch((err) => next(err))
})

router.get('/company/:id', (req, res, next) => {

    const { id } = req.params;

    Company.findById(id)
        .populate('ramen')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => next(err))

})

router.post('/company', (req, res, next) => {
    const { name, companyUrl } = req.body;

    const company = {name, companyUrl}

    Company.create(company)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => next(err));
})

router.delete('/company/:id', (req,res, next) => {
    const { id } = req.params;

    Company.findByIdAndRemove(id)
        .then((result) => {
            res.status(204).json();
        })
        .catch((err) => next(err))
})

module.exports = router;