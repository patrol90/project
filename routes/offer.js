const express = require('express'),
router = express.Router(),
offerController = require('../controllers/offer');

router.post('/create',offerController.createNewOffer);

module.exports = router;