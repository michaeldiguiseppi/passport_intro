var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex');
function Users () {
  return knex('users');
}

passport.use(new LocalStrategy({
  usernameField: 'username'
},
  function(username, password, done) {
    Users().where('username', username).then(function(data) {
      if (data) {
        if (data[0].password === password) {
          return done(null, data);
        } else {
          return done(null, false);
        }
      }
    });
  }
));

// sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used on subsequent requests to update 'req.user' and update session
passport.deserializeUser(function(id, done) {
  // find user and return by id
  Users().where('id', id).then(function(data) {
    return data;
  });
});

module.exports = passport;
