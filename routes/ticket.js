const express = require('express'),
router = express.Router(),
ticketController = require('../controllers/ticket');

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.findTicket);
router.post('/create', ticketController.createTicket);

module.exports = router;

