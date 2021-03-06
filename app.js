const express = require('express'),
path = require('path'),
router = express.Router(),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
session = require('express-session'),
MongoStore = require('connect-mongo')(session),
crypto = require('crypto');


//routes
const indexRouter = require('./routes/index'),
stoRouter = require('./routes/sto'),
ticketRouter = require('./routes/ticket'),
userRouter = require('./routes/user'),
offerRouter = require('./routes/offer'),
apiRouter = require('./routes/api')


const app = express();

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
app.use('/api',apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




mongoose.connect('mongodb://localhost/database',{useMongoClient: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info("DB ready");
});

module.exports = app;

