var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
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
  res.send({username: username, password: password});
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
  res.send({username: username, password: password});
});

module.exports = router;


// GET to "/" - display a welcome message
// GET to "/login" - display a form for entering an email and password (use HTML5 validation) for logging in
// POST to "/login" - handle form submission, by first assigning the keys from the req.body object to variables and then res.sending those variables back to the client side
// GET to "/logout" - redirect to the main route
// GET to "/register" - display a form for entering an email and password (use HTML5 validation) for registering
// POST to "/register" - handle form submission, by first assigning the keys from the req.body object to variables and then res.sending those variables back to the client side
