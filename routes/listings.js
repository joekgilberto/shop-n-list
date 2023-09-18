var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const listingsCtrl = require('../controllers/listings')

const multer = require("multer");
const upload = multer();

// Listing route that get all listings
router.get('/', listingsCtrl.index)

// Listing route that renders a new listing page (when logged in)
router.get('/new', ensureLoggedIn, listingsCtrl.new)

//Listing route that shows a more details of a specific listing
router.get('/:id', listingsCtrl.show)

// Listing route that allows owners to go to an edit page for their listing (when logged in)
router.get('/:id/edit', ensureLoggedIn, listingsCtrl.edit)

// Listing route that allows users to create a new listing (when logged in)
router.post('/', ensureLoggedIn, upload.single("imageUpload"), listingsCtrl.create);

// Listing route that allows user to update their own listing (when logged in)
router.put('/:id', ensureLoggedIn, upload.single("imageUpload"), listingsCtrl.update)

// Listing route that allows user to delete their own listing (when logged in)
router.delete('/:id', ensureLoggedIn, listingsCtrl.delete)


module.exports = router;
