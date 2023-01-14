const PORT = '3030';
var compression = require('compression');
var createError = require('http-errors');
var express = require('express');
var winston = require('winston');
var path = require('path');
var cookieSession = require('cookie-session');

const winstonLogger = winston.createLogger({
  level: 'warn',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
  ],
});
var logger = require('morgan');
var rateLimit = require('express-rate-limit');
var limiter = new rateLimit({ // Limit the api requests
  windowMs: 10 * 60 * 1000, // 10 minutes 
  max: 500, // limit each IP to 500 requests per windowMs 
});

// SETUP workers
var rw = require('./workers/rw');
//var sJob = require('./workers/sheduledJob');
var users = require('./workers/users');
var su = require('./workers/admin');


var app = express();
app.use(compression());
app.use(limiter);

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
  secret: "Mys3cr3tpluSp3pp3r",
  httpOnly: false,
  maxAge: 30 * (24 * 60 * 60 * 1000),//(day) * number
  secure: false,// set true before push
  overwrite: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.head('*',(req,res)=>{

  var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  var date = new Date()
  winstonLogger.log('warn',`ci sta provando: ${ip} ${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT')}`)

  res.status(404).send();
})

app.get('/', function (req, res) {
  if (typeof req.session.username === 'undefined')res.redirect('/login');
  else res.render('index');
});

app.get('/login', (req, res) => {
  if(typeof req.session.username !== 'undefined')res.redirect('/');
  else res.render('login');
})

app.get('/configurations', function (req, res) {
  if (typeof req.session.username === 'undefined')res.send({});
  else res.send({'username': req.session.username});
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.render('logout');
});

app.post('/login', users.regLog);
//manda il contenuto del file 
app.post('/get_data', rw.leggi);
// scrive su un file 
app.post('/send_data', rw.scrivi);

app.get('/check_errors', (req, res) => res.send(req.session));

app.get('/admin',su.check);
app.get('/4dm1n',su.getData);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

//  SS

var http = require('http');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || PORT);
app.set('port', port);

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port,()=>{console.log(`Server started: http://localhost:${port}`)});
server.on('error', onError);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

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

/**
 * Event listener for HTTP server "listening" event.
 */