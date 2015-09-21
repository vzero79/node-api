'use strict';

var express = require('express');

module.exports.init = function (db) {
  // Initialize express app
  var app = express();
  return app;
}