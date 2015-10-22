'use strict';

var       mongoose = require('mongoose'),
              path = require('path'),
    imageProcessor = require(path.resolve("lib")+"/image/processor");

exports.createPost = function (req, res) {
  imageProcessor.writeBase64ImageToDisk(req.body.image, function(err){
    if (err) res.json({errors: err});
    else res.json({success: true});
  });
};