module.exports.indexShow = (req, res, next) => {
    res.render('index', {
        title: 'Проект1',
        session: req.session.user})
}
module.exports.userCreate = (req, res, next) => {
    res.render('pages/register', {
        title: 'Регистрация',
        formName: 'Регистрация',
        action:"/user/create",
        fields: [
            {name:'name',type:'text',property:'required',label:'Имя',element:'input'},
            {name:'login',type:'text',property:'required',label:'Логин',element:'input'},
            {name:'password',type:'password',property:'required',label:'Пароль',element:'input'},
            {name:'email',type:'email',property:'required',label:'Е-mail',element:'input'},
            {name:'phone',type:'tel',property:'required',label:'Телефон',element:'input'},
            {name:'type',type:'text',property:'required',label:'Тип',element:'select', values:[{label:'Клиент',val:'client'},{label:'Сто',val:'station'}]},
        ],
    })
}

module.exports.userLogin = (req, res, next) => {
    res.render('pages/register', {
        title: 'Авторизуйтесь',
        formName: 'Авторизация',
        action:"/user/login",
        fields: [
            {name:'login',type:'text',property:'required',label:'Логин',element:'input'},
            {name:'password',type:'password',property:'required',label:'Пароль',element:'input'},
        ]
    });
}


