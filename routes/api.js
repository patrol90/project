const express = require('express'),
router = express.Router(),
offerController = require('../controllers/offer');
stoController = require('../controllers/sto');
ticketController = require('../controllers/ticket');
userController = require('../controllers/user');

router.get('/sto', stoController.jsonShowAll);
router.post('/sto/create', stoController.createOne);
router.post('/sto/:id', stoController.jsonShowOne);

module.exports = router;
