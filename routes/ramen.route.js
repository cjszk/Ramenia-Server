'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ramen = require('../models/ramen');
const Rating = require('../models/rating');
const Company = require('../models/company');

router.get('/ramen', (req, res, next) => {
    Ramen.find()
        .populate('companyId')
        .populate('tags')
        .populate('ratings')
        .then((result) => res.json(result))
        .catch((err)=> next(err));
})

router.get('/ramen/:id', (req, res, next) => {

    const { id } = req.params;

    Ramen.findById(id)
        .populate('companyId')
        .populate('tags')
        .populate('ratings')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => next(err))

})

router.post('/ramen', (req, res, next) => {

    const { name, companyId, image } = req.body;

    const ramen = {name, companyId, image}

    let ramenId;
    let returnResult;
    Ramen.create(ramen)
        .then((result) => {
            ramenId = result.id;
            returnResult = result;
            Company.findById(companyId)
                .then((result) => {
                    let newCompanyInfo = result;
                    newCompanyInfo.ramen.push(ramenId)
                    Company.findByIdAndUpdate(companyId, newCompanyInfo)
                    .then((result) => {
                        res.json(returnResult);
                    })
                    .catch((err) => next(err))
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))

})

router.put('/ramen/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, companyId, image } = req.body;
    const ramen = {name, companyid, image}

    Ramen.findByIdAndUpdate(id, ramen)
        .then((result) => res.json(result))
        .catch((err) => next(err))
})


module.exports = router;