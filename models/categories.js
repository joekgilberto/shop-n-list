const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Category schema that holds a title property
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);