const Categories = require('../models/categories');

// Display list of all Categories
exports.categories_list = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Categories list');
};

// Display detail page for a specific Category
exports.categories_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
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