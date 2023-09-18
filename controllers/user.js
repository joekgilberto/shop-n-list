// Imports User, Listing, Auction, and Category models, along with utility functions from their controllers and the ObjectId type conversion from MongoDB
const User = require('../models/user');
const Listing = require('../models/listings')
const Auction = require('../models/auctions');
const Category = require('../models/categories')

// exports the function of the controller
module.exports = {
    index
}

// A function that finds the user, their associated listings, and their posted auctions, returning them to be displayed on an index page
async function index(req, res, next) {
    try {
        const id = req.params.id
        const currentUser = await User.findById(id)
        const listings = await Listing.find({ user: currentUser._id });
        listings.sort((a, b) => {
            return b.listingDate - a.listingDate
        })

        const auctions = []
        const postedAuctions = await Auction.find({ user: id })
        for (let postedAuction of postedAuctions) {
            let alreadyIn = false
            let foundListing = await Listing.findById(postedAuction.listing)

            for (auction of auctions){
                if (postedAuction.listing.equals(auction._id)){
                    alreadyIn = true
                }
            }

            if (!alreadyIn){
                auctions.push(foundListing)
            }
            
        }

        auctions.sort((a, b) => {
            return b.listingDate - a.listingDate
        })

        const allCategories = await Category.find().sort('title');

        res.render('user/index', { title: currentUser.name, listings, categories: allCategories, auctions });

    } catch (err) {
        console.log(err);
        next(err);
    }
}