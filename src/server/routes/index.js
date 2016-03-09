var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/auth.js');
function Users () {
  return knex('users');
}

router.get('/', function(req, res, next) {
  var message = req.flash('message')[0];
  console.log(req.user);
  res.render('index', { title: 'Welcome', message: message, user: req.user});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        req.flash('message', {status: 'success', value: 'Welcome '+user.email});
        return res.redirect('/');
      });
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.flash('message', {status: 'success', value:'Successfully logged out.'});
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  var message = req.flash('message')[0];
  res.render('register', {message: message});
});

router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  Users().where('email', req.body.username).then(function(data) {
    if (data.length) {
      req.flash('message', {
        status: 'danger',
        value: 'Email already exists.  Please try again.'
      });
      res.redirect('/register');
    } else {
      Users().insert({
        email: username,
        password: password
      }).then(function() {
          req.flash('message', {status: 'success', value: 'Successfully Registered.'});
          res.redirect('/login');
      });
    }
  });
});

module.exports = router;
