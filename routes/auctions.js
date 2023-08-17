var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const auctionsCtrl = require('../controllers/auctions')

router.post('/listings/:id/auction/new', ensureLoggedIn, auctionsCtrl.create)
router.delete('/listings/:listingId/auction/:auctionId', ensureLoggedIn, auctionsCtrl.delete)

module.exports = router;