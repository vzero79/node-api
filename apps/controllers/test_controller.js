'use strict';

var mongoose = require('mongoose'),
      crypto = require('crypto'),
 AccessToken = mongoose.model('AccessToken');

exports.testApi = function (req, res) {
  res.json({message: "API is running"});
};

exports.generateToken = function(req, res){
  var data  = {token: crypto.randomBytes(32).toString('hex')}
  var token = new AccessToken(data);
  token.save(function(err){
    if (err) res.json({errors: {message: 'Cannot generate token'}});
    else res.json({token: data.token});
  });
};