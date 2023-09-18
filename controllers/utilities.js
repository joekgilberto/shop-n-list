// Imports multer. cloudinary, and streamifier to handle image uploads, and imports the Listing model
const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");
const Listing = require('../models/listings');


cloudinary.config(clConfig);

// exports functions of the controller
module.exports = {
    auctionDetermination,
    highestBid,
    streamUpload
}

// ranks auction bids as "Too Low" if they're below the listing's asking price
function auctionDetermination(auctionData,foundListing) {
    if (auctionData.offer < foundListing.price) {
        auctionData.ranking = 0
    } else {
        auctionData.ranking = 1
    }
}

// sorts the auction bids and ranks the top on as "Highest Bid"
async function highestBid(auctions) {
    if (auctions.length > 0) {

        auctions.forEach(async (a) => {
            let foundListing = await Listing.findById(a.listing)
            auctionDetermination(a,foundListing)
            await a.save()
        })

        auctions.sort((a, b) => {
            return b.offer - a.offer
        })

        auctions[0].ranking = 2
    }
}

// if a request has a file, it uploads the file to cloudinary and returns an object containing a URL to the image source
function streamUpload(req) {
    if (req.file) {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
    }
};