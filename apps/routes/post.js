'use strict';

var Controller = require('../controllers/posts_controller');

module.exports = function(app){
  app.post('/post', Controller.createPost);
}