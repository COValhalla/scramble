const Categories = require('../models/categories');
const Hikes = require('../models/hikes');

// Display list of all Categories
exports.categories_list = function (req, res, next) {
  Categories.find({}, 'name description')
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      res.render('categories', {
        title: 'Categories',
        categories_list: list_categories,
      });
    });
};

// Display detail page for a specific Category
exports.categories_detail = function (req, res, next) {
  Hikes.find({ category: req.params.id }, 'name description')
    .sort([['name', 'ascending']])
    .exec(function (err, list_hikes) {
      if (err) {
        return next(err);
      }
      res.render('categoryDetail', {
        title: 'Hikes',
        hikes_list: list_hikes,
      });
    });
};

// Display Category create form on GET
exports.categories_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle Category create on POST
exports.categories_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category create POST');
};

// Display Category delete form on GET
exports.categories_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST
exports.categories_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET
exports.categories_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST
exports.categories_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category update POST');
};
