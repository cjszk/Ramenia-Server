'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  ramen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ramen' }],
  companyUrl: {type: String, default: 'https://www.google.com/'}
});

CompanySchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Company', CompanySchema);
