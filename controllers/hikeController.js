const Hikes = require('../models/hikes');

// Display all hikes
exports.hikes_list = function (req, res, next) {
  Hikes.find({}, 'name description rating miles elevation difficulty')
    .sort([['name', 'ascending']])
    .populate('category')
    .exec(function (err, list_hikes) {
      if (err) {
        return next(err);
      }
      res.render('hikes', {
        title: 'Hikes',
        hikes_list: list_hikes,
      });
    });
};

// Display specific hike detail
exports.hikes_detail = function (req, res, next) {
  Hikes.findById(req.params.id)
    .populate('category')
    .exec(function (err, hike_detail) {
      if (err) {
        return next(err);
      }
      res.render('hikeDetail', {
        title: 'Hike Details',
        hike_detail: hike_detail,
      });
    });
};

// Display hike create form on GET
exports.hikes_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes create GET');
};

// Handle hike create on POST
exports.hikes_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes create POST');
};

// Display hike delete form on GET
exports.hikes_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes delete GET');
};

// Handle hike delete on POST
exports.hikes_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes delete POST');
};

// Display hike update form on GET
exports.hikes_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes update GET');
};

// Handle hike update on POST
exports.hikes_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Hikes update POST');
};
