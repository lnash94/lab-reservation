var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connection to database

mongoose.connect(config.database);

//on connection
mongoose.connection.on('conncted', ()=>{
  console.log('Connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err)=>{
  console.log('Database error ' + err);
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var labsRouter = require('./routes/labs');
var reservationsRouter = require('./routes/reservations');
 
var app = express();
var port = 3300;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", 'Content-Type');
 next();
});

//CORS middleware

app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/labs',labsRouter);
app.use('/reservations',reservationsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//Body paser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,function(){
    console.log('Server started on port '+port);
});



module.exports = app;
