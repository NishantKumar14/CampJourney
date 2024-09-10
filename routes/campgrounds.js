const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js')
const { isLoggedIn, isAuthor, validateCamground } = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCamground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCamground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;