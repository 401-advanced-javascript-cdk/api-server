'use strict';

const schema = require('./categories-schema.js');
const Model = require('./model.js');

class Categories extends Model {}
  
module.exports = new Categories(schema);