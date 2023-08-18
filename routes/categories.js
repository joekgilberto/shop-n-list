var express = require('express');
var router = express.Router();
const categoryCtrl = require('../controllers/categories')

router.get('/categories', categoryCtrl.index);

router.get('/categories/new', categoryCtrl.new);

router.post('/categories', categoryCtrl.create);

module.exports = router;
