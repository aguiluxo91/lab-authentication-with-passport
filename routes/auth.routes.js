const express = require('express');
const router = express.Router();
// Require user model
const User = require('../models/User.model');
// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// Add passport

const ensureLogin = require('connect-ensure-login');
const mongoose = require('mongoose');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
} );

router.get('/login', (req, res, next) => {
  res.render('auth/login');
})

router.post('/signup', (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render('auth/signup', {
      user: req.body,
      errors: errors,
    });
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        renderWithErrors({ username: 'User already registered' });
      } else {
        return User.create(req.body).then((user) => {
          res.render('auth/login');
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
} );



router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('passport/private', { user: req.user });
});

module.exports = router;
