const Category = require('../models/categories');
const Listing = require('../models/listings');

module.exports = {
    index,
    create,
    new: newCategory,
    addToCategory
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
    await Category.create(categoryData);
    res.redirect('/categories');
}

// Function that renders a page to make a new category
async function newCategory(req, res) {
    res.render("categories/new", {
        categories: await Category.find({}),
        title: 'New Category',
        errorMsg: "",
    });
}

// Function that adds categories to listings
async function addToCategory(req, res){
    const listingId = req.params.id
    const categoryId = req.body.categoryId

    try {
        const saving = await Listing.findById(listingId).then(async function(result){
            await result.category.push(categoryId)
        }).then(async function(result){
            await result.save()
        })
        res.redirect(`/listings/${foundListing._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}
