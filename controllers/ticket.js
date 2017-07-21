let Ticket = require('../models/ticket');

module.exports.getAllTickets = (req, res, next)=> {

    let allTickets = [];
    if (req.session.user  && req.session.user.id){
        query = {};
        if (req.session.user.type === 'client'){
            query = {user:req.session.user.id };
        }
        Ticket.find(query, (err, result) => {
            if (!err){
                allTickets = result;
            } else {throw err;}

            res.render('pages/ticket',{
                title: 'Ваши заявки',
                tickets: allTickets,
                formName: 'Оставить заявку',
                action:"ticket/create",
                fields: [
                    {name:'name',type:'text',property:'required',label:'Название',element: 'input'},
                    {name:'info',type:'text',property:'required',label:'Содержание',element :'textarea'},
                    {name:'contacts',type:'text',property:'required',label:'Ваши контакты', element: 'input'},
                ],
                session: req.session.user
            });
        });
    }
    else {
        let title ='';
        if(!req.session.user){
            title = 'Заявки доступы только авторизованным пользователям'
        } else {
            title = 'У вас нет заявок'
        }
        res.render('pages/ticket',{
            title: title,
            tickets: '',
            session: req.session.user
        });
    }

};

module.exports.findTicket = (req, res, next) => {
    Ticket.findOne({_id: req.params.id}).populate('user offer').exec((err, result) => {
        if (req.session.user && req.session.user.type === 'station'){
            req.session.user.lookNow = req.params.id;
            req.session.save((err) => {
                if(err) console.log(err)
            })
            res.render('pages/ticket-select',{
                body: result.info,
                title: result.name,
                userInfo: result.user,
                offersInfo: result.offers,
                canOffer: true,
                formName: 'Оставить предложение',
                action:"/offer/create",
                fields: [
                    {name:'description',type:'text',property:'required',label:'Предложение',element: 'input'},
                ],
                session: req.session.user
            });
        } else {
            res.render('pages/ticket-select',{body:result.info,title:result.name,userInfo:result.user,canOffer: false,session: req.session.user});
        }
    });
};

module.exports.createTicket = (req, res, next) => {

    let newTicket = new Ticket({
        name: req.body.name,
        info: req.body.info,
        user: req.session.user.id,
        contacts:req.body.contacts,
    });

    newTicket.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('new ticket');
            res.redirect('/');
        }
    });
}