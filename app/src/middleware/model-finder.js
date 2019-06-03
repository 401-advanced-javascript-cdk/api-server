'use strict';

module.exports = (request, response, next) => {
  let modelName = request.params.model;
  console.log(modelName);
  request.model = require(`../models/${modelName}.js`);
  next();
};