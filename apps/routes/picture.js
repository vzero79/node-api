'use strict';

var Controller = require('../controllers/pictures_controller'),
          Auth = require('../auth/bear');

module.exports = function(app){
  app.post('/pictures/new', Auth.passport.authenticate('bearer', { session: false }), Controller.create);
}