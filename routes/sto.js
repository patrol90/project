var express = require('express');
var router = express.Router();
var StoModel = require('../models/sto');


router.get('/', function(req, res, next) {
  res.render('pages/sto',{sto: ["СТО Янки мавра","CTO Пушкинская","СТО Притыцкого"],title:"Все сто"});
});

router.get('/:id', function(req, res, next) {
 res.render('pages/sto-select',{body:"Описание сто бла бла бла бла",title:"СТО Янки мавра"});
});

router.post('/create',function (req, res, next) {
    if(req.body){
        var newSto = new StoModel({
            name:  req.body.name,
            address: req.body.address,
            tickets: [],
            about: req.body.about,
        });
        newSto.save(function (err) {
            if(err){ throw err }
            else  {
             console.log("Добавлено новое сто");
             console.log(newSto);
            }
        });
    }
});

module.exports = router;
