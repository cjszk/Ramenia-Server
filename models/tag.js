'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TagSchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, default: Date.now()},
});

TagSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


module.exports = mongoose.model('Tag', TagSchema);
