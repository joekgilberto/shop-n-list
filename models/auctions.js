const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    offer: {type: Number, required: true},
    accepted: {type: Boolean, default: false},
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    user: { type: Schema.Types.ObjectId },
    username: { type: String }
})

module.exports = mongoose.model('Auction', auctionSchema)