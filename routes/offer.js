var express = require('express');
var router = express.Router();
var Offer = require('../models/offer');
var Ticket = require('../models/ticket');

router.post('/create', function(req, res, next) {

    NewOffer = new Offer({
        ticket: req.session.user.lookNow,
        description: req.body.description,
        station: req.session.user.id,
    });

    NewOffer.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new offer');
            Ticket.findOneAndUpdate({_id:req.session.user.lookNow }, {$push : {offers:NewOffer._id}},function (err, result) {
                if (err){ console.log(err) } else { console.log(result)}
            });
            res.redirect('/');
        }
    });


});

module.exports = router;