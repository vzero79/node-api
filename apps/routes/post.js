'use strict';

var Controller = require('../controllers/posts_controller'),
          Auth = require('../auth/bear');

module.exports = function(app){
  app.post('/girls/new', Auth.passport.authenticate('bearer', { session: false }), Controller.createPost);
}