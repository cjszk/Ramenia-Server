'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  ramen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ramen' }],
  companyURL: {type: String}
});

CompanySchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

CompanySchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}; 

CompanySchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Company', CompanySchema);
