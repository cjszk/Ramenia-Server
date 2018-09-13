'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ramen = require('../models/ramen');
const Rating = require('../models/rating');
const Company = require('../models/company');

router.get('/ramen-data/:id', (req, res, next) => {

    const { id } = req.params;

    Ramen.findById(id)
        .populate('company')
        .populate('tags')
        .populate('ratings')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => next(err))

})

router.post('/ramen', (req, res, next) => {

    const { name, company } = req.body;

    const ramen = {name, company}

    let ramenId;
    let returnResult;
    Ramen.create(ramen)
        .then((result) => {
            ramenId = result.id;
            returnResult = result;
            Company.findById(company)
                .then((result) => {
                    let newCompanyInfo = result;
                    newCompanyInfo.ramen.push(ramenId)
                    Company.findByIdAndUpdate(company, newCompanyInfo)
                    .then((result) => {
                        res.json(returnResult);
                    })
                    .catch((err) => next(err))
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))

})


module.exports = router;