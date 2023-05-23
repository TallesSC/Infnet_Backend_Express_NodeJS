const express = require('express');
const router = express.Router();

const genresController = require('../controllers/genres');

router.get('/', genresController.getGenres);
router.post('/add', genresController.addGenre);
router.delete('/:name', genresController.deleteGenre);

module.exports = router;