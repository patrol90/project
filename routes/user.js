var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


router.get('/', function(req, res, next) {
    if(req.session.user){
       var curUser =  User.findOne({_id: req.session.user.id},function (err, result) {
           res.render('pages/user',{info: [result.name,result.email,result.phone],title:"Личный кабинет",session: req.session.user});
       });
    } else {

        res.render('pages/user',{info: ["Телефон","Адрес","Машина"],title:"Вы не авторизованы"});
    }
    console.log(req.session.user);
});

router.post('/login', function (req, res, next) {
    User.findOne({login: req.body.login},function (err, result) {
        console.log(result);

        if (req.body.password){
            bcrypt.compare(req.body.password, result.password, function(err, answer) {
                if (answer){
                    console.log('eee')
                    req.session.user = {id: result._id, name: result.name, type: result.type, auth: true};
                    console.log('autorize');
                    res.redirect('/user');
                } else {
                    console.log('wrogn password');
                    res.redirect('/login');
                }
            })
        }
    })

});

router.post('/create', function(req, res, next) {

    var NewUser = new User({
        name:  req.body.name,
        login: req.body.login,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
    });
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if(err) console.log(err);
        NewUser.password = hash;
    });
    NewUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new user');
            req.session.user = {id: NewUser._id, name: NewUser.name, type: NewUser.type, auth:true};
            res.redirect('/');
        }
    });
});

module.exports = router;
