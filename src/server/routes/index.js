var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/auth.js');
function Users () {
  return knex('users');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  res.json({username: username, password: password});
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  res.json({username: username, password: password});
});

module.exports = router;
