const Listing = require('../models/listings')
const Auction = require('../models/auctions');
const User = require('../models/user');
const Category = require('../models/categories')

module.exports = {
    index
}

async function index(req, res, next) {
    try {
        const id = req.params.id
        const currentUser = await User.findById(id)
        const listings = await Listing.find({user: currentUser._id});
        listings.sort((a, b) => {
            return b.listingDate - a.listingDate
        })

        const auctions = []
        const postedAuctions = await Auction.find({user: id})
        postedAuctions.forEach(async (postedAuction)=>{
            auctions.push(await Listing.findById(postedAuction.listing))
        })

        auctions.sort((a, b) => {
            return b.listingDate - a.listingDate
        })
        
        const allCategories = await Category.find().sort('title');
        console.log("auctions",auctions)

        res.render('user/index', { title: currentUser.name, listings, categories: allCategories, auctions});
    } catch (err) {
        console.log(err);
        next(err);
    }
}