var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var crypto = require('crypto');

//routes
var indexRouter = require('./routes/index');
var stoRouter = require('./routes/sto');
var ticketRouter = require('./routes/ticket');
var userRouter = require('./routes/user');
var offerRouter = require('./routes/offer');

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(session({
    secret: '$$$',
    resave: false,
    saveUninitialized: false,
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: new MongoStore({
        url: 'mongodb://localhost/database',
    })
}))

app.use('/', indexRouter);
app.use('/sto', stoRouter);
app.use('/ticket', ticketRouter);
app.use('/user', userRouter);
app.use('/offer', offerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info("DB ready");
});


module.exports = app;

