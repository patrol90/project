var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/sto',{sto: ["СТО Янки мавра","CTO Пушкинская","СТО Притыцкого"],title:"Все сто"});
});

router.get('/:id', function(req, res, next) {
 res.render('pages/sto-select',{body:"Описание сто бла бла бла бла",title:"СТО Янки мавра"});
});

module.exports = router;
