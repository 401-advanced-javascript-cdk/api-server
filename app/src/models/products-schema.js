'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  title: {type:String, required:true},
  text: {type:String},
  quantity: {type:Number, required:true},
  category: {type:String, required: true}
});

module.exports = mongoose.model('products', products);