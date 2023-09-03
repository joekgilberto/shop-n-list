const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");
const Listing = require('../models/listings');


cloudinary.config(clConfig);

module.exports = {
    auctionDetermination,
    highestBid,
    streamUpload
}

function auctionDetermination(auctionData,foundListing) {
    if (auctionData.offer < foundListing.price) {
        auctionData.accepted = 0
    } else {
        auctionData.accepted = 1
    }
}

async function highestBid(auctions) {
    if (auctions.length > 0) {

        auctions.forEach(async (a) => {
            let foundListing = await Listing.findById(a.listing)
            auctionDetermination(a,foundListing)
            console.log(a.accepted)
            await a.save()
        })

        auctions.sort((a, b) => {
            return b.offer - a.offer
        })

        auctions[0].accepted = 2
    }
}

function streamUpload(req) {
    if (req.file) {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    console.log(result);
                    resolve(result);
                } else {
                    reject(error);
                }
            });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
    }
};