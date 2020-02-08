var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Adtoniq
var jsonFormat = require('json-format');
var bodyParser = require('body-parser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

// ---------------------------
// Adtoniq code
// ---------------------------

var fs = require('fs');
const Adtoniq = require("./Adtoniq.js")

const apiKey = "53567ed4-c3ce-415a-a0c5-6b22f47e03f2";
const adtoniq = new Adtoniq(apiKey);


// Gets data for demo page
function getDemoData() {
  var header = fs.readFileSync('header.html', 'utf8')
  var body = fs.readFileSync('body.html', 'utf8')
  const headCode = adtoniq.getHeadCode({})
  const data = {
    title: 'Adtoniq demo'
    , headCode: headCode
    , header: header
    , body: body
  }
  return data
}

// Generates HTML for demo data
function getHTML(data, res) {
  var html = `<html>
  <head>
  ${data.headCode}
  ${data.header}
  </head>
  <body>
  ${data.body}
  </body>
  </html>
  `
  return html
}

// 
// Handlers
// 

// Handle Adtoniq refresh calls
app.post('/', function(req, res) {
  let sync = true;
  if (sync) {
    adtoniq.processRequest(req.body)
    res.status(200).json({error: "", result: "Ok"})
  } else {
    // EXPERIMENTAL
    adtoniq.processRequest(req.body, (error, response) => {
      if (error) {
        res.status(200).json({error: error, result: ""})
      } else {
        res.status(200).json({error: "", result: "Ok, length: "+response.length})
      }
    })
  }
})

// Example using direct HTML
app.get('/', function(req, res) {
  const data = getDemoData()
  const html = getHTML(data, res)
  res.send(html)
})

// Example using jade
app.get('/demo', function(req, res) {
  const data = getDemoData()
  res.render('demo', data)
})

// ---------------------------
// End of Adtoniq code
// ---------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
