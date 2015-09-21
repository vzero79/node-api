/**
 * Module dependencies.
 */
var    chalk = require('chalk'),
        path = require('path'),
    mongoose = require('mongoose'),
  yml_config = require('yaml-config'),
  app_config = yml_config.readConfig(__dirname+'/apps.yml');

module.exports.loadModels = function () {
  // Globbing model files
  // config.files.server.models.forEach(function (modelPath) {
  //   require(path.resolve(modelPath));
  // });
};

// Initialize Mongoose
module.exports.connect = function (cb) {
  var _this = this;

  var db = mongoose.connect(app_config.db.uri, app_config.db.options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', app_config.db.debug);

      // Call callback FN
      if (cb) cb(db);
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info(chalk.yellow('Disconnected from MongoDB.'));
    cb(err);
  });
};