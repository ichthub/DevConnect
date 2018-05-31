const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const { SecretKey } = require('./keys');

const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SecretKey;
module.exports = passport => {
  // the jwt payload is the payload you assigned earlier in user.js line 70
  passport.use(
    new Strategy(opts, (payload, done) => {
      // console.log(payload);
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch(err => {
          console.log(`Error from jwt strategy${err}`);
        });
    })
  );
};
