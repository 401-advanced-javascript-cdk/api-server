'use strict';

const mongoose = require('mongoose');

const categories = mongoose.Schema({
  title: {type:String, required:true},
  text: {type:String},
});

module.exports = mongoose.model('categories', categories);