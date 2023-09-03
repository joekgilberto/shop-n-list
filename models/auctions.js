const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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