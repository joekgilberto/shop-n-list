const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    listingDate: {
        type: Date,
        default: new Date()
    },
    sold: {
        type: Boolean,
        default: false
    },
    //add required true
    user: { type: Schema.Types.ObjectId },
    username: { type: String }
})

module.exports = mongoose.model('Listing', listingSchema)