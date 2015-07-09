var User = require('../models/Tiffin');
var Admin = require('../models/Admin');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




//When passport is created, this says what as to be stored with regards to the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Invoked by passport.session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});
passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, admin) {
    done(err, admin);
  });
});


/**
 * Sign in using Email and Password.
 */
passport.use('user-local',new LocalStrategy({usernameField: 'email'},function(email, password, done) {
  email = email.toLowerCase();
  User.findOne({ email: email }, function(err, user) {
    if (!user) return done(null, false, { message: 'Email ' + email + ' not found'});
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

passport.use('admin-local',new LocalStrategy({usernameField: 'name'},function(name, password, done) {
  name = name.toLowerCase();
  Admin.findOne({ name: name }, function(err, admin) {
    if (!admin) return done(null, false, { message: 'name ' + name + ' not found'});
    admin.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, admin);
      } else {
        return done(null, false, { message: 'Invalid name or password.' });
      }
    });
  });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
};







