const express = require('express'),
router = express.Router(),
stoController = require('../controllers/sto');

router.get('/',stoController.showAll);
router.get('/:id',stoController.showOne);
router.post('/create',stoController.createOne);
router.post('/feedback', stoController.createFeedback);

module.exports = router;
