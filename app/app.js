'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./src/middleware/error.js');
const notFound = require('./src/middleware/404.js');
const authRouter = require( './src/api/auth-router.js' );
const apiRouter = require('./src/api/v1.js');

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(express.static('./public'));

// Routes
server.use(authRouter);
server.use(apiRouter);

// Redirect Middleware
server.use('*', notFound);
server.use(errorHandler);

const start = (port) => {
  server.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};

module.exports = { server, start };