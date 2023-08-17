var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const listingsCtrl = require('../controllers/listings')

router.get('/', listingsCtrl.index)

router.get('/new', listingsCtrl.new)

router.get('/:id', listingsCtrl.show)

router.get('/:id/edit', listingsCtrl.edit)

router.post('/', ensureLoggedIn, listingsCtrl.create);

router.put('/:id', ensureLoggedIn, listingsCtrl.update)

router.delete('/:id', ensureLoggedIn, listingsCtrl.delete)

module.exports = router;
