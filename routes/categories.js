var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const categoryCtrl = require('../controllers/categories')

router.get('/categories', categoryCtrl.index);

router.get('/categories/new', ensureLoggedIn, categoryCtrl.new);

router.post('/categories', ensureLoggedIn, categoryCtrl.create);

router.get('/categories/:id', categoryCtrl.show);

module.exports = router;
