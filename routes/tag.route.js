'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tag = require('../models/tag');
const Ramen = require('../models/ramen');

router.get('/tags', (req, res, next) => {
    Tag.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/tags', (req, res, next) => {

    const {name} = req.body;

    Tag.create({name})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => next(err));

})

router.put('/tags-ramen', (req, res, next) => {

    const { tagId, ramenId } = req.body;

    Ramen.findById(ramenId)
        .then((result) => {
            let ramen = result;
            ramen.tags.push(tagId);
            Ramen.findByIdAndUpdate(ramenId, ramen)
                .then((result) => res.json(result))
                .catch((err) => next(err));
        })
        .catch((err) => next(err))
})

router.put('/remove-tags-ramen', (req, res, next) => {

    const { tagId, ramenId } = req.body;

    Ramen.findById(ramenId)
        .then((result) => {
            let ramen = result;
            let tags = result.tags.filter((tag) => String(tag) !== String(tagId));
            ramen.tags = tags;
            Ramen.findByIdAndUpdate(ramenId, ramen)
                .then((result) => res.json(result))
                .catch((err) => next(err));
        })
        .catch((err) => next(err))
})

module.exports = router;