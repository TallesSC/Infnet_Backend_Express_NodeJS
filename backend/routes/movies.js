const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getMovies);
router.post('/add', moviesController.addMovie);
router.patch('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;