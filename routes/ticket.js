var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/tickets',{tickets: ["Заявка 1", "Заявка 2", "Заявка 3"],title: "Все заявки" });
});

router.get('/:id', function(req, res, next) {
    res.render('pages/tickets-select',{body:"Описание Заявки бла бла бла бла",title:"Заявка №1"});
});

module.exports = router;
