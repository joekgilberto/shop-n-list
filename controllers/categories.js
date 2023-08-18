const Category = require('../models/categories');
const Listing = require('../models/listings');

module.exports = {
    index,
    create,
    new: newCategory
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
