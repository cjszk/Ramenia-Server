'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RatingSchema = new mongoose.Schema({
  overall: {type: Number, required: true},
  spicyMeter: {type: Number, required: true},
  review: {type: String, default: 'This user has not written a review'},
  created: {type: Date, default: Date.now()},
});

RatingSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

RatingSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}; 

RatingSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Rating', RatingSchema);
