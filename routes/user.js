var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', function(req, res, next) {
    if(req.session.user){
       var curUser =  User.findOne({_id: req.session.user.id},function (err, result) {
           res.render('pages/user',{info: [result.name,result.email,result.phone],title:"Личный кабинет"});
       });
    } else {

        res.render('pages/user',{info: ["Телефон","Адрес","Машина"],title:"Личный кабинет"});
    }
    console.log(req.session.user);
});

router.post('/create', function(req, res, next) {
    var NewUser = new User({
        name:  req.body.name,
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
    });
    NewUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('new user');
            req.session.user = {id: NewUser._id, name: NewUser.name, type: NewUser.type}
            res.redirect('/');
        }
    });
});

module.exports = router;
