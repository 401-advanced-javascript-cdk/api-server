'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users-model.js');
const auth = require('../middleware/auth.js');
const oauth = require('../middleware/oauth/google.js');

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

authRouter.get('/key', auth(), (req, res, next) => {
  const key = req.user.generateKey();
  res.status(200).send(key);
});

module.exports = authRouter;