'use strict';

const schema = require('./categories-schema.js');
const Model = require('./model.js');

class Products extends Model {}
  
module.exports = new Products(schema);