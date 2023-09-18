//ensures a user is logged in if they try to access a route, or redirects them to the login page
module.exports = function(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }