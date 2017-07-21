const User = require('../models/user');

module.exports.showCabinet = (req, res, next) => {
    if(req.session.user){
        let curUser =  User.findOne({_id: req.session.user.id},(err, result) => {
            res.render('pages/user',{info: [result.name,result.email,result.phone],title:"Личный кабинет",session: req.session.user});
        });
    } else {
        res.render('pages/user',{info: ["Телефон","Адрес","Машина"],title:"Вы не авторизованы"});
    }
    console.log(req.session.user);
};

module.exports.loginUser = (req, res, next) => {
    User.findOne({login: req.body.login},(err, result) => {
        if (req.body.password){
            bcrypt.compare(req.body.password, result.password, (err, answer) => {
                if (answer){
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
};

module.exports.createUser = (req, res, next) => {
    const NewUser = new User({
        name:  req.body.name,
        login: req.body.login,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
    });
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if(err) console.log(err);
        NewUser.password = hash;
    });
    NewUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('new user');
            req.session.user = {id: NewUser._id, name: NewUser.name, type: NewUser.type, auth:true};
            res.redirect('/');
        }
    });
}