'use strict';

var express = require('express'),
 bodyParser = require('body-parser'),
   passport = require('passport'),
         fs = require('fs'),
methodOverride = require('method-override');

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(passport.initialize());
}

/**
 * Configure the modules server routes
 */
module.exports.initModulesRoutes = function (app) {
  var routes_path = process.cwd() + '/apps/routes';
  var route_files = fs.readdirSync(routes_path);
  route_files.forEach(function(file){
    require(routes_path+'/'+file)(app);
  });
};

module.exports.init = function (db) {
  // Initialize express app
  var app = express();

  this.initMiddleware(app);
  this.initModulesRoutes(app);

  return app;
}