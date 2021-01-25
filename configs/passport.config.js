const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser((user, next) => {
    next(null, user.id);
});

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => next(null, user))
        .catch(next);
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, next) => {
    User.findOne({ username })
        .then(user => {
            if (!user) {
                next(null, null, { username: 'Invalid username or password'})
            } else {
                return user.checkPassword(password)
                    .then(match => {
                        if (match) {
                            
                        }
                    })
            }
        })
}))