const Listing = require('../models/listings')
const Auction = require('../models/auctions')
const Category = require('../models/categories')
const Utilities = require('./utilities')
const ObjectId = require('mongodb').ObjectId;

const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");

cloudinary.config(clConfig);



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
        const listings = await Listing.find();
        listings.sort((a, b) => {
            return b.listingDate - a.listingDate
        })

        const allCategories = await Category.find().sort('title');

        res.render('index', { title: 'Shop \'n\' List', listings, categories: allCategories });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Function that renders a page to add new listings
async function newListing(req, res, next) {
    const allCategories = await Category.find().sort('title');

    res.render('listings/new', { title: 'New Listing', categories: allCategories, errorMsg: '' });
}

// Function that creates a listing using form data and assings it a user, username, and category property
async function create(req, res, next) {
    const listingData = { ...req.body };

    listingData.category = req.body.categoryId;
    listingData.user = req.user._id;
    listingData.username = req.user.name;

    try {
        let streamUploadResult = await Utilities.streamUpload(req);
        if (streamUploadResult){
            listingData.image = streamUploadResult.url
        }
        const createdListing = await Listing.create(listingData).then(function (result) {
            res.redirect(`/listings/${result._id}`);
        })
    } catch (err) {
        const allCategories = await Category.find().sort('title');
        console.log(err);
        res.render('listings/new', { title: 'New Listing', errorMsg: err.message, categories: allCategories });
    }
}

// Function to display one listing at a time and all of its details
async function show(req, res, next) {
    try {
        const id = req.params.id
        const showListing = await Listing.findById(id);
        const auctions = await Auction.find({ listing: new ObjectId(id) });
        const currentCategory = await Category.findById(showListing.category);

        Utilities.highestBid(auctions)

        res.render('listings/show', { title: showListing.title, listing: showListing, auctions, topBid: auctions[0], category: currentCategory });
    } catch (err) {
        console.log(err);
        next(Error(err));
    }
}

// Function to render an edit page to update a listing 
async function edit(req, res, next) {
    const id = req.params.id;
    const results = await Listing.findById(id);
    const auctions = await Auction.find({ listing: new ObjectId(id) });
    const allCategories = await Category.find().sort('title');

    Utilities.highestBid(auctions)

    res.render('listings/edit', { title: `Edit Listing`, listing: results, categories: allCategories, id, errorMsg: '', topBid: auctions[0] })
}

// Function to take form data to update a listing collection
async function update(req, res, next) {
    const id = req.params.id
    const updatedData = req.body
    updatedData.category = [updatedData.categoryId]

    const auctions = await Auction.find({ listing: new ObjectId(id) });
    Utilities.highestBid(auctions)
    
    let streamUploadResult = await Utilities.streamUpload(req);
    console.log("streamUploadResult",streamUploadResult)

    if (streamUploadResult){
        updatedData.image = streamUploadResult.url
    }

    if (updatedData.sold === 'on') {
        updatedData.sold = true
        auctions[0].accepted = true
    } else {
        updatedData.sold = false
        auctions[0].accepted = false
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

    Auction.deleteMany({ listing: id }).then(function () {
        Listing.deleteOne({ _id: id }).then(function () {
            res.redirect(`/listings`)

        })
            .catch(function (err) {
                next(err)
            })
    })

}