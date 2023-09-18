const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// A Listing schema that holds a tilte, description, price, category, generated listing date, boolean saying if it is sold or not, an image (with a default public domain image source set if one is not uploaded), a user and that user's username.
const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    listingDate: {
        type: Date,
        default: new Date()
    },
    sold: {
        type: Boolean,
        default: false
    },
    image: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/4/40/Shopping-cart-icon-with-bags-symbol-only.png?20210611024910" },
    //add required true
    user: { type: Schema.Types.ObjectId },
    username: { type: String }
})

module.exports = mongoose.model('Listing', listingSchema)