var express = require('express');
var router = express.Router();
const passport = require('passport');

//an index route that redirects the route URL to /listings
router.get('/', function(req, res, next) {
  res.redirect('/listings');
});

// index routes for passport authentication with Google OAuth
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: "select_account"
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/listings',
    failureRedirect: '/listings'
  }
));

// an index route that handles logouts and redirects back to home page
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/listings');
  });
});

module.exports = router;
