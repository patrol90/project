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
                {name:'name',type:'text',property:'required',label:'Название'},
                {name:'info',type:'text',property:'required',label:'Содержание'},
                {name:'contacts',type:'text',property:'required',label:'Ваши контакты'},
            ]
        });
    });


});

router.get('/:id', function(req, res, next) {
    res.render('pages/ticket-select',{body:"Описание Заявки бла бла бла бла",title:"Заявка №1"});
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
