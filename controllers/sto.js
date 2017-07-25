const StoModel = require('../models/sto'),
FeedbackModel = require('../models/feedback'),
helper = require('../public/helper');

module.exports.showAll = (req, res, next) => {
    StoModel.find({},(err, result) => {
        if (!err){
            if(req.session.user && req.session.user.type === 'station'){
                res.render('pages/sto',{
                    sto:result,
                    title:"Все сто",
                    session: req.session.user,
                    formName: 'Добавить свое сто',
                    action:"api/sto/create",
                    fields: [
                        {name:'name',type:'text',property:'required',label:'Название',element: 'input'},
                        {name:'address',type:'text',property:'required',label:'Адресс',element :'textarea'},
                        {name:'contacts',type:'text',property:'required',label:'Телефоны',element :'input'},
                        {name:'about',type:'text',property:'required',label:'Описание',element :'textarea'},
                    ],
                });
            } else {
                res.render('pages/sto',{sto:result,title:"Все сто", session: req.session.user});
            }
        } else {throw err;}
    });
}

module.exports.showOne = (req, res, next) => {
        StoModel.findOne({_id :req.params.id}).populate('feedback').exec((err, result) => {
            if(err) console.log(err);
            let QueryFeedbacks = [];
            FeedbackModel.find({_id: result.feedbacks},(err,feedb) => {
                if(req.session.user && req.session.user.type === 'client'){
                    res.render('pages/sto-select',{
                        body:result.about,
                        title:result.name,
                        address:result.address,
                        session: req.session.user,
                        contacts: result.contacts,
                        feed: feedb,
                        formName: 'Оставить отзыв о СТО',
                        action:"/sto/feedback",
                        fields: [
                            {name:'name',type:'text',property:'required',label:'Заголовок',element: 'input'},
                            {name:'description',type:'text',property:'required',label:'Отзыв',element: 'textarea'},
                            {name:'station_id',type:'hidden',property:'required',label:'',element: 'input',value: result._id},
                        ],
                    });
                } else {
                    res.render('pages/sto-select',{
                        body:result.about,
                        title:result.name,
                        address:result.address,
                        session: req.session.user,
                        contacts: result.contacts,
                        feed: result.feedbacks
                    });
                }
            });
        });
};

module.exports.createOne = (req, res, next) => {
    if(req.body){
        let newSto = new StoModel({
            name:  req.body.name,
            address: req.body.address,
            tickets: [],
            about: req.body.about,
            contacts: req.body.contacts
        });
        newSto.save((err) => {
            if(err){ throw err }
            else  {
                helper.sendJsonResponse(res,201,newSto)
            }
        });
    }
};

module.exports.createFeedback = (req, res, next) => {
    if(req.body){
        let newFeeback = new FeedbackModel({
            header:  req.body.name,
            description: req.body.description,
            station: req.body.station_id
        });
        newFeeback.save( (err) => {
            if(err){ throw err }
            else  {
                console.log("Добавлен новый отзыв");
                StoModel.findOneAndUpdate({_id:req.body.station_id }, {$push : {feedbacks:newFeeback._id}}, (err, result)=> {
                    if (err){ console.log(err) } else { console.log(result)}
                });
                res.redirect('/sto');
            }
        });
    }
}

module.exports.jsonShowAll = (req, res, next) => {
    StoModel.find({},(err, result) => {
        if(!result){
            helper.sendJsonResponse(res,404,{message:"stations not found"});
        } else {
            helper.sendJsonResponse(res,200,result);
        }
    });
}
module.exports.jsonShowOne = (req, res, next) => {
    console.log(req.params);
    StoModel.findOne({_id :req.params.id}).populate('feedback').exec((err, result) => {
        if(err) console.log(err);
        FeedbackModel.find({_id: result.feedbacks},(err,feedb) => {

        });
    });
}