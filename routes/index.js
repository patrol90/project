var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Мой проект',
    formName: 'Регистрация',
    action:"user/create",
    fields: [
          {name:'name',type:'text',property:'required',label:'Имя'},
          {name:'login',type:'text',property:'required',label:'Логин'},
          {name:'password',type:'password',property:'required',label:'Пароль'},
          {name:'email',type:'email',property:'required',label:'Е-mail'},
          {name:'phone',type:'tel',property:'required',label:'Телефон'},
          {name:'type',type:'text',property:'required',label:'Тип'},
    ]
    });

});

module.exports = router;
