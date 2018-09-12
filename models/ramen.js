'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RamenSchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }]
});

RamenSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

RamenSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}; 

RamenSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Ramen', RamenSchema);