var path = require('path'),
      fs = require('fs'),
  mkdirp = require('mkdirp'),
  crypto = require('crypto');

var decodeBase64Image = function(dataString){
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};
  if (matches == null || matches.length !== 3) return null;
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}

exports.writeBase64ImageToDisk = function(dataString, imagePath, callback){
  var imageBuffer = decodeBase64Image(dataString);
  if (imageBuffer == null) return callback("Image invalid");

  var imageTypeRegularExpression = /\/(.*?)$/;
  var seed                       = crypto.randomBytes(20);
  var uniqueSHA1String           = crypto.createHash('sha1').update(seed).digest('hex');
  var uniqueRandomImageName      = imagePath !== undefined ? 'image' : 'image-' + uniqueSHA1String;
  var imageTypeDetected          = imageBuffer.type.match(imageTypeRegularExpression);
  var userUploadedDirPath        = path.resolve("public/system") + "/" + imagePath;
  var userUploadedImagePath      = userUploadedDirPath + "/" + uniqueRandomImageName + '.' + imageTypeDetected[1];
  mkdirp(userUploadedDirPath, function(err){
    if (err) callback(err);
    fs.writeFile(userUploadedImagePath, imageBuffer.data, function(err){
      if (err) callback(err);
      else callback(null, userUploadedImagePath);
    });
  });
}