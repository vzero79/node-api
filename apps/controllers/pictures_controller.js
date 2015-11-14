'use strict';

var       mongoose = require('mongoose'),
              path = require('path'),
    imageProcessor = require(path.resolve("lib")+"/image/processor"),
           Picture = mongoose.model('Picture'),
             async = require('async');

exports.create = function (req, res) {
  var imageString = req.body.image;

  async.waterfall([
      function(callback) {
        Picture.create({title: 'abc'}, function(err, picture){
          if (err) callback(err);
          else callback(null, picture)
        });
      },
      function(picture, callback){
        var imagePath = "picture/" + picture.id
        imageProcessor.writeBase64ImageToDisk(imageString, imagePath, function(err, uploadedImagePath){
          if (err) callback(err);
          else callback(null, picture, uploadedImagePath)
        });
      },
      function(picture, imagePath, callback){
        picture.path = imagePath;
        picture.save(function(err){
          if (err) callback(err);
          else callback(null, picture);
        });
      }
    ], function(err, picture){
      if (err) res.json({errors: err});
      else res.json({success: {id: picture.id, title: picture.title, path: picture.path}});
    });
};