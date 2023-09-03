var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const userCtrl = require('../controllers/user')

router.get('/user/:id', ensureLoggedIn, userCtrl.index)

module.exports = router;
