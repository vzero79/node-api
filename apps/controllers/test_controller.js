'use strict';

exports.testApi = function (req, res) {
  res.json({
    msg: 'API is running from controller'
  });
};