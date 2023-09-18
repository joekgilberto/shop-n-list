var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const userCtrl = require('../controllers/user')

// User route that shows a user's listings and auctiosn (when logged in)
router.get('/user/:id', ensureLoggedIn, userCtrl.index)

module.exports = router;
