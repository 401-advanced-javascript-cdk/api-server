'use strict';

const express = require('express');
const modelFinder = require('../middleware/model-finder.js');
const router = express.Router();
const auth = require('../middleware/auth.js');

router.param('model', modelFinder);

// Route Definitions

router.get('/api/v1/:model', auth('read'), handleGetAll);
router.post('/api/v1/:model', auth('create'), handlePost);

router.get('/api/v1/:model/:_id', auth('read'), handleGetOne);
router.delete('/api/v1/:model/:_id', auth('delete'), handleDelete);
router.put('/api/v1/:model/:_id', auth('update'), handlePut);

// Route Handlers

/**
 * Sends get requests to the model for group gets
 * @function handleGetAll
 * @param {object} request - Express request object 
 * @param {object} response - Express response object 
 * @param {function} next - Express next() 
 */

function handleGetAll(request, response, next) {
  request.model.get()
    .then(results => {
      let count = results.length;
      response.json({ count, results });
    })
    .catch(next);
}

/**
 * Sends get requests to the model with the _id from request.params
 * @function handleGetOne
 * @param {object} request - Express request object 
 * @param {object} response - Express response object 
 * @param {function} next - Express next() 
 */

function handleGetOne(request, response, next) {
  let _id = request.params._id;
  request.model.get(_id)
    .then(results => response.json(results[0]))
    .catch(next);
}

/**
 * Sends post requests to the model with request.body
 * @function handlePost
 * @param {object} request - Express request object 
 * @param {object} response - Express response object 
 * @param {function} next - Express next() 
 */
function handlePost(request, response, next) {
  request.model.post(request.body)
    .then(results => response.json(results))
    .catch(next);
}
/**
 * Sends put requests to the model with request.params._id and request.body
 * @function handlePut
 * @param {object} request - Express request object 
 * @param {object} response - Express response object 
 * @param {function} next - Express next() 
 */
function handlePut(request, response, next) {
  let _id = request.params._id;
  request.model.put(_id, request.body)
    .then(results => response.json(results))
    .catch(next);
}

/**
 * Sends delete requests to the model with request.params._id
 * @function handleDelete
 * @param {object} request - Express request object 
 * @param {object} response - Express response object 
 * @param {function} next - Express next() 
 */

function handleDelete(request, response, next) {
  let _id = request.params._id;
  request.model.delete(_id)
  .then(results => response.json(results))
  .catch(next)
}

module.exports = router;