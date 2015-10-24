var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var AccessToken = new Schema({
  token: {
    type: String,
    unique: true,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AccessToken', AccessToken);