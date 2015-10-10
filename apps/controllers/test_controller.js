'use strict';

var mongoose = require('mongoose'),
        User = mongoose.model('User');

exports.testApi = function (req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.json({
      msg: users
    });
  });
};