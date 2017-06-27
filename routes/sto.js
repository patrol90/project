var express = require('express');
var router = express.Router();
var StoModel = require('../models/sto');
var FeedbackModel = require('../models/feedback');


router.get('/', function(req, res, next) {

    StoModel.find({},function (err, result) {
        if (!err){
            if(req.session.user && req.session.user.type === 'station'){
                res.render('pages/sto',{
                    sto:result,
                    title:"Все сто",
                    session: req.session.user,
                    formName: 'Добавить свое сто',
                    action:"sto/create",
                    fields: [
                        {name:'name',type:'text',property:'required',label:'Название',element: 'input'},
                        {name:'address',type:'text',property:'required',label:'Адресс',element :'textarea'},
                        {name:'contacts',type:'text',property:'required',label:'Телефоны',element :'input'},
                        {name:'about',type:'text',property:'required',label:'Описание',element :'textarea'},
                    ],
                });
            } else {
                res.render('pages/sto',{sto:result,title:"Все сто", session: req.session.user});
            }
        } else {throw err;}
    });

});

router.get('/:id', function(req, res, next) {
    StoModel.findOne({_id :req.params.id}).populate('feedback').exec(function (err, result) {
        if(err) console.log(err);
        var QueryFeedbacks = [];
        FeedbackModel.find({_id: result.feedbacks},function (err,feedb) {
            if(req.session.user && req.session.user.type === 'client'){
                res.render('pages/sto-select',{
                    body:result.about,
                    title:result.name,
                    address:result.address,
                    session: req.session.user,
                    contacts: result.contacts,
                    feed: feedb,
                    formName: 'Оставить отзыв о СТО',
                    action:"/sto/feedback",
                    fields: [
                        {name:'name',type:'text',property:'required',label:'Заголовок',element: 'input'},
                        {name:'description',type:'text',property:'required',label:'Отзыв',element: 'textarea'},
                        {name:'station_id',type:'hidden',property:'required',label:'',element: 'input',value: result._id},
                    ],
                });
            } else {
                res.render('pages/sto-select',{
                    body:result.about,
                    title:result.name,
                    address:result.address,
                    session: req.session.user,
                    contacts: result.contacts,
                    feed: result.feedbacks
                });
            }
        });

    });

});

router.post('/create',function (req, res, next) {
    if(req.body){
        var newSto = new StoModel({
            name:  req.body.name,
            address: req.body.address,
            tickets: [],
            about: req.body.about,
            contacts: req.body.contacts
        });
        newSto.save(function (err) {
            if(err){ throw err }
            else  {
             console.log("Добавлено новое сто");
             console.log(newSto);
             res.redirect('/');
            }
        });

    }
});

router.post('/feedback',function (req, res, next) {
    if(req.body){
        var newFeeback = new FeedbackModel({
            header:  req.body.name,
            description: req.body.description,
            station: req.body.station_id
        });
        newFeeback.save(function (err) {
            if(err){ throw err }
            else  {
                console.log("Добавлен новый отзыв");
                StoModel.findOneAndUpdate({_id:req.body.station_id }, {$push : {feedbacks:newFeeback._id}},function (err, result) {
                    if (err){ console.log(err) } else { console.log(result)}
                });
                res.redirect('/sto');
            }
        });
    }
});

module.exports = router;
