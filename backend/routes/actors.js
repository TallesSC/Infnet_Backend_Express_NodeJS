const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');

router.get('/', actorsController.getActors);
router.post('/add', actorsController.addActor);
router.patch('/:id', actorsController.updateActor);
router.delete('/:id', actorsController.deleteActor);

module.exports = router;