var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const listingsCtrl = require('../controllers/listings')

const multer = require("multer");
const upload = multer();

router.get('/', listingsCtrl.index)

router.get('/new', ensureLoggedIn, listingsCtrl.new)

router.get('/:id', listingsCtrl.show)

router.get('/:id/edit', ensureLoggedIn, listingsCtrl.edit)

router.post('/', ensureLoggedIn, upload.single("imageUpload"), listingsCtrl.create);

router.put('/:id', ensureLoggedIn, upload.single("imageUpload"), listingsCtrl.update)

router.delete('/:id', ensureLoggedIn, listingsCtrl.delete)


module.exports = router;
