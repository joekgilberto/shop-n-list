const Listing = require('../models/listings')
const Auction = require('../models/auctions')
const Category = require('../models/categories')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    index,
    new: newListing,
    create,
    show,
    edit,
    update,
    delete: deleteListing
}

// Function that renders a listing index page
async function index(req, res, next) {
    try {
        const id = req.params.id
        const listings = await Listing.find(id).populate('category');
        listings.sort((a,b)=>{
          return b.listingDate - a.listingDate
        })

        const allCategories = await Category.find({ _id : { $nin: listings.category }}).sort('title');

        res.render('index', { title: 'All Listings', listings, categories: allCategories });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Function that renders a page to add new listings
async function newListing(req, res, next) {
    const id = req.params.id
    const listings = await Listing.find(id).populate('category');

    const allCategories = await Category.find({ _id : { $nin: listings.category }}).sort('title');

    res.render('listings/new', { title: 'New Listing', listings, categories: allCategories, errorMsg: '' });
}

// Function that creates a listing using form data and assings it a user, username, and category property
async function create(req, res, next) {
    const listingData = { ...req.body };

    listingData.listingDate = new Date();
    listingData.user = req.user._id;
    listingData.username = req.user.name;

    try {
        const createdListing = await Listing.create(listingData).then(function(result){
            result.category.push(req.body.categoryId)
            result.save()
            res.redirect(`/listings/${result._id}`);
        })
    } catch (err) {
        const id = req.params.id
        const listings = await Listing.find(id).populate('category');
        const allCategories = await Category.find({ _id : { $nin: listings.category }}).sort('title');
        console.log(err);
        res.render('listings/new', { title: 'New Listing', errorMsg: err.message, categories: allCategories });
    }
}

// Function to display one listing at a time and all of its details
async function show(req, res, next) {
    try {
        const id = req.params.id
        const showListing = await Listing.findById(id).populate('category');
        let auctions = await Auction.find({listing: new ObjectId(id)});

        const allCategories = await Category.find({ _id : { $nin: showListing.category }}).sort('title');
        
        if (auctions.length > 0) {

            auctions.forEach(a=>{
                a.accepted = false
            })
    
            auctions.sort((a, b) => {
                return b.offer - a.offer
            })
    
            auctions[0].accepted = true

            auctions.forEach(async (a) => {
                await a.save()
            })
        }

        res.render('listings/show', { title: showListing.title, listing: showListing, auctions, categories: allCategories });
    } catch (err) {
        console.log(err);
        next(Error(err));
    }
}

// Function to render an edit page to update a listing 
async function edit(req, res, next) {
    const id = req.params.id;
    const results = await Listing.findById(id).populate('category');

    const allCategories = await Category.find({}).sort('title');
    
    res.render('listings/edit', { title: `Edit Listing`, listing: results, categories: allCategories, id, errorMsg: '' })
}

// Function to take form data to update a listing collection
async function update(req, res, next) {
    const id = req.params.id
    const updatedData = req.body
    updatedData.category = [updatedData.categoryId]
    
    if (updatedData.sold === 'on') {
        updatedData.sold = true
    } else {
        updatedData.sold = false
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        )
        res.redirect(`/listings/${id}`)
    } catch (err) {
        next(err)
    }
}

// Deletes a listing and all of its auction data
async function deleteListing(req, res, next) {
    const id = req.params.id;
  
    Auction.deleteMany({ listing: id }).then(function(){
        Listing.deleteOne({ _id: id }).then(function () {
            res.redirect(`/listings`)

        })
            .catch(function (err) {
                next(err)
            })
    })

}