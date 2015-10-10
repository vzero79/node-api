'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('./mongoose'),
     express = require('./express'),
        path = require('path'),
       chalk = require('chalk'),
  yml_config = require('yaml-config'),
  app_config = yml_config.readConfig(path.resolve('config/apps.yml'));

// Initialize Models
mongoose.loadModels();

module.exports.loadModels = function loadModels() {
  mongoose.loadModels();
};

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, app_config);
  });
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, app_config) {
    // Start the app by listening on <port>
    app.listen(app_config.port, function () {
      // Logging initialization
      console.log(chalk.yellow('HELLO :)'));
      console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t\t'   + app_config.port));
      console.log(chalk.green('Database:\t\t\t' + app_config.db.uri));
      if (callback) callback(app, db, app_config);
    });
  });
};