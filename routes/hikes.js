const express = require('express');
const router = express.Router();

const hikes_controller = require('../controllers/hikeController');
const categories_controller = require('../controllers/categoryController');

// Hikes routes
router.get('/', hikes_controller.hikes_list);

router.get('/hike/:id', hikes_controller.hikes_detail);

router.get('/hike/create', hikes_controller.hikes_create_get);
router.post('/hike/create', hikes_controller.hikes_create_post);

router.get('/hike/:id/delete', hikes_controller.hikes_delete_get);
router.post('/hike//:id/delete', hikes_controller.hikes_delete_post);

router.get('/hike/:id/update', hikes_controller.hikes_update_get);
router.post('/hike/:id/update', hikes_controller.hikes_update_post);

// Categories routes

router.get('/', categories_controller.categories_list);

router.get('/category/:id', categories_controller.categories_detail);

router.get('/category/create', categories_controller.categories_create_get);
router.post('/category/create', categories_controller.categories_create_post);

router.get('/category/:id/delete', categories_controller.categories_delete_get);
router.post(
  '/category//:id/delete',
  categories_controller.categories_delete_post,
);

router.get('/category/:id/update', categories_controller.categories_update_get);
router.post(
  '/category/:id/update',
  categories_controller.categories_update_post,
);

module.exports = router;
