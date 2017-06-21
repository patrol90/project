var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {
    res.render('pages/user',{info: ["Телефон","Адрес","Машина"],title:"Личный кабинет"});
});

router.get('/create', function(req, res, next) {
    res.send("user create");
});

module.exports = router;
