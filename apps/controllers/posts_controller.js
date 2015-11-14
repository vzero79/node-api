'use strict';

var       mongoose = require('mongoose'),
              path = require('path'),
    imageProcessor = require(path.resolve("lib")+"/image/processor");

exports.createPost = function (req, res) {
  var imageString = req.body.image;
  console.log(imageString);
  imageProcessor.writeBase64ImageToDisk(imageString, function(err){
    if (err) res.json({errors: err});
    else res.json({success: true});
  });
};