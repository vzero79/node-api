'use strict';

var test_controller = require('../controllers/test_controller');

module.exports = function(app){
  app.get('/', test_controller.testApi);
}