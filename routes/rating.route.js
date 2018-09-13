'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ramen = require('../models/ramen');
const Rating = require('../models/rating');

router.post('/post-rating/:id', (req, res, next) => {

    const { id } = req.params;
    const { overall, spicyMeter, review } = req.body;

    const newRating = {overall, spicyMeter, review};
    let ramen;

    Ramen.findById(id)
        .then((result) => {
            ramen = result;
            Rating.create(newRating)
            .then((result) => {
                ramen.ratings.push(result.id);
                Ramen.findByIdAndUpdate(id, ramen)
                .populate('ratings')
                .populate('tags')
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        })
        .catch((err) => next(err));
})

router.put('/update-rating/:id', (req, res, next) => {

    const { id } = req.params;
    const { overall, spicyMeter, review } = req.body;

    const newRating = {overall, spicyMeter, review};

    Rating.findByIdAndUpdate(id, newRating)
        .then((result) => res.json(result))
        .catch((err) => next(err));
})


module.exports = router;