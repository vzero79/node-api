var mongoose = require('mongoose'),
      crypto = require('crypto'),
      Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

User.methods.encryptPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

User.virtual('password')
    .set(function(password){
      this._plainPassword = password;
      this.salt = crypto.crypto.randomBytes(32).toString('hex');
      this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){ return this._plainPassword; });

User.methods.verifyPassword = function(password){
  return this.encryptPassword(password) === this.hashed_password;
};

module.exports = mongoose.model('User', User);