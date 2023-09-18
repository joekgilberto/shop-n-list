const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Auction schema that requires an offer price, a ranking (which corresponds to "Too Low", "Considering", or "Highest Offer"), a boolean of whether the bidding has been accepted, an aossciated listing, an associated user, and that user's username
const auctionSchema = new Schema({
    offer: {type: Number, required: true},
    ranking: {type: Number, required: true},
    accepted: {type: Boolean, default: false, required: true},
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    user: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
})

module.exports = mongoose.model('Auction', auctionSchema)