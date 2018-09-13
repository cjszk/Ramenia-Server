'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tag = require('../models/tag');
const Ramen = require('../models/ramen');

router.post('/post-tag/:id', (req, res, next) => {

    const {id} = req.params;

    const {name} = req.body;

    Tag.create({name})
        .then((result) => {
            const tagId = result.id;
            Ramen.findById(id)
                .then((result) => {
                    let ramen = result;
                    ramen.tags.push(tagId)
                    Ramen.findByIdAndUpdate(id, ramen)
                        .then((result) => res.json(result))
                        .catch((err) => next(err))
                })
                .catch((err) => next(err));
        })
        .catch((err) => next(err));

})


module.exports = router;