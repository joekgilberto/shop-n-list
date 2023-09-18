// Imports Category and Listing models, along with the ObjectId type conversion from MongoDB
const Category = require('../models/categories');
const Listing = require('../models/listings');
const ObjectId = require('mongodb').ObjectId;

// exports functions of the controller
module.exports = {
    index,
    create,
    new: newCategory,
    show
};

// Function that renders index page, passing through all listings and categories
async function index(req, res, next) {
    try {
        const listings = await Listing.find({})
        const allCategories = await Category.find({}).sort('title');
        res.render('categories/index', { title: 'All Categories', categories: allCategories, listings });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Function that creates a category and redirects back to categories
async function create(req,res,next){
    const categoryData = {...req.body}
    try{
        await Category.create(categoryData);
        res.redirect('/categories');
    }catch(err){
        res.render("categories/new", {
            categories: await Category.find({}),
            title: 'New Category',
            errorMsg: err
        });
    }
}

// Function that renders a page to make a new category
async function newCategory(req, res) {
    res.render("categories/new", {
        categories: await Category.find({}),
        title: 'New Category',
        errorMsg: "",
    });
}

// Function that shows a specific category and its associated listings
async function show(req, res, next) {
    try {
        const id = req.params.id
        const category = await Category.findById(id)
        const listings = await Listing.find({category: new ObjectId(id)})
        res.render('categories/show', { title: category.title, category, listings });
    } catch (err) {
        console.log(err);
        next(err);
    }
}