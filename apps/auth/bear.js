var mongoose = require('mongoose'),
    passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    AccessToken = mongoose.model('AccessToken');

passport.use(new BearerStrategy(
  function(token, done) {
    AccessToken.findOne({token: token}, function(err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false, { message: 'Unauthenticated!' }); }
      return done(null, token);
    });
}));

exports.passport = passport;