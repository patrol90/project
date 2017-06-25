var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');

router.get('/', function(req, res, next) {
    var allTickets = [];
    Ticket.find({}, function(err, result) {
        if (!err){
            allTickets = result;
            console.log(allTickets)
        } else {throw err;}

        res.render('pages/ticket',{
            title: 'Все заявки',
            tickets: allTickets,
            formName: 'Оставить заявку',
            action:"ticket/create",
            fields: [
                {name:'name',type:'text',property:'required',label:'Название',element: 'input'},
                {name:'info',type:'text',property:'required',label:'Содержание',element :'textarea'},
                {name:'contacts',type:'text',property:'required',label:'Ваши контакты', element: 'input'},
            ]
        });
    });


});

router.get('/:id', function(req, res, next) {
   Ticket.findOne({_id: req.params.id}).populate('user offerg').exec(function (err, result) {
       if (req.session.user && req.session.user.type === 'station'){
           req.session.user.lookNow = req.params.id;
           req.session.save(function(err) {
                if(err) console.log(err)
           })
           res.render('pages/ticket-select',{
               body: result.info,
               title: result.name,
               userInfo: result.user,
               offersInfo: result.offers,
               canOffer: true,
               formName: 'Оставить предложение',
               action:"/offer/create",
               fields: [
                   {name:'description',type:'text',property:'required',label:'Предложение',element: 'input'},
               ]
           });
       } else {
           res.render('pages/ticket-select',{body:result.info,title:result.name,userInfo:result.user,canOffer: false});
       }
   });
});

router.post('/create', function(req, res, next) {

    var newTicket = new Ticket({
        name: req.body.name,
        info: req.body.info,
        user: req.session.user.id,
        contacts:req.body.contacts,
    });

    newTicket.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new ticket');
            res.redirect('/');
        }
    });
});




module.exports = router;
