var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const categoryCtrl = require('../controllers/categories')

// Category route that allow users to see all categories,
router.get('/categories', categoryCtrl.index);

// Category route that navigates to a new categories page (when logged in)
router.get('/categories/new', ensureLoggedIn, categoryCtrl.new);

// Category route that creates a new category (when logged in)
router.post('/categories', ensureLoggedIn, categoryCtrl.create);

// Category route that shows all a category's lsitings
router.get('/categories/:id', categoryCtrl.show);

module.exports = router;
