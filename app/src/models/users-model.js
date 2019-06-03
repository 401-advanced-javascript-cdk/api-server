'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ----------------------------------------------------------------------------------------------
// SCHEMA AND VIRTUALS
// ----------------------------------------------------------------------------------------------

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
});

const capabilities = {
  admin: ['read', 'update', 'create', 'delete', 'super'],
  editor: ['read', 'update', 'create'],
  user: ['read'],
}


// ----------------------------------------------------------------------------------------------

const usedTokens = [];


users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.createFromOauth = function(email) {

  if(!email) { return Promise.reject('Validation Error'); }

  return this.findOne( {email} )
    .then(user => {
      if(!user) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch(error => {
      console.log('Creating new user');
      let username = email;
      let password = 'none';
      return this.create({username, password, email});
    });
};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.statics.authenticateToken = function(token) {
  if (usedTokens.includes(token)) {
    throw new Error('token already used');
  }
  const decryptedToken = jwt.verify(token, process.env.SECRET);
  if (!!process.env.SINGLE_USE_TOKENS) {
    if(decryptedToken.type !== 'key') {
      usedTokens.push(token);
    }
  }
  return this.findOne({_id: decryptedToken.id});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then(valid => valid ? this : null);
};

users.methods.generateToken = function(type) {
  console.log(this);
  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  };

  if (token.type !== 'key') {
    return jwt.sign( token, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME || 900 } );
  }
  else {
    return jwt.sign(token, process.env.SECRET)
  }
};

users.methods.generateKey = function() {
  return this.generateToken('key');
}

users.methods.checkCapability = function(capability) {
  // const thisUsersCapabilities = capabilities[this.role];
  return capabilities[this.role].includes(capability);
}
module.exports = mongoose.model('users', users);