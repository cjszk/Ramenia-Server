'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RamenSchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, default: Date.now()},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  image: {type: String}
});

RamenSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Ramen', RamenSchema);
