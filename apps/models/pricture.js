var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var Picture = new Schema({
  title: {
    type: String
  },
  path: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Picture', Picture);