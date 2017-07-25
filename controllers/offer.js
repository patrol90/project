const Offer = require('../models/offer'),
Ticket = require('../models/ticket');

module.exports.createNewOffer = (req, res, next) => {

    NewOffer = new Offer({
        ticket: req.session.user.lookNow,
        description: req.body.description,
        station: req.session.user.id,
    });

    NewOffer.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('new offer');
            Ticket.findOneAndUpdate({_id:req.session.user.lookNow }, {$push : {offers:NewOffer._id}},(err, result) => {
                if (err){ console.log(err) } else { console.log(result)}
            });
          res.redirect('/');

        }
    });
}