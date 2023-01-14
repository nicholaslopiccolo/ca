require('dotenv').config()

var passport = require('passport');
require('./passport');// initialize the strategy
var compression = require('compression');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var randomstring = require("randomstring");
var cookieSession = require('cookie-session');
var helmet = require('helmet')

var logger = require('morgan');
var rateLimit = require('express-rate-limit');
var limiter = new rateLimit({ // Limit the api requests
  windowMs: 10 * 60 * 1000, // 10 minutes 
  max: 500, // limit each IP to 500 requests per windowMs 
});

// SETUP routers
//var rw = require('./workers/rw');
//var users = require('./workers/users');
var su = require('./workers/admin');

var app = express();
app.use(compression());
app.use(limiter);
//app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
  name: 'session',
  secret: randomstring.generate(),
  httpOnly: false,
  maxAge: 10 * (24 * 60 * 60 * 1000), //(day) * number
  secure: false, // set true before push
  overwrite: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

//Mongo Connection
const mongoDb = require('./mongoDB');
const { exit } = require('process');
// After mongo Connection we can start the server
mongoDb.connectToServer(function (err) {
  if(err){
    console.log(err);
    exit()
  }

  let _db = mongoDb.getDb();

  const apiMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(403);
    }
    next();
  };
  // ROUTERS
  const api = require('./api/v1/api')(_db)

  app.use('/api/v1', apiMiddleware, api)
  app.get('/check_errors', (req, res) => res.send(req.session));
  app.get('/admin', su.check);
  app.get('/4dm1n', su.getData);

  app.get('/oauth2/redirect/google',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      successRedirect:'/api/v1/user/register/google',
      failureRedirect: '/sign'
    }));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });
/*
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
  });*/

  //  SS

  var http = require('http');
  /**
   * Get port from environment and store in Express.
   */
  var port = process.env.PORT || '8080';
  app.set('port', port);

  var server = http.createServer(app);
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ?
      'Pipe ' + port :
      'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
})