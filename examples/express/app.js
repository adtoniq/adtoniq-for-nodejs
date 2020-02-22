var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
// Utilities
// ---------------------------

var jsonFormat = require('json-format');
var fs = require('fs');

// ---------------------------
// Adtoniq code
// ---------------------------

const Adtoniq = require("adtoniq-express")
const apiKey = "53567ed4-c3ce-415a-a0c5-6b22f47e03f2";

/** 
 *  Optional. This functionanility demonstrates how to implement 
 *  a manually update your cache / CDN when the JavaScript is updated.
 *  This example uses a local file
 */
const adtoniqCacheFilename = "adtoniqCache"
/** 
 *  This function will be called to cache the data
 */
saveScript = function(script, callback) {
  fs.writeFile(adtoniqCacheFilename, script, 'utf8', () => {
    callback() 
  })
}

/** 
 *  This function will be called to return the data from the cache
 */
loadScript = function(callback) {
  fs.readFile(adtoniqCacheFilename, 'utf8', (error, script) => {
    callback(script)
  })
}

const adtoniq = new Adtoniq(apiKey, saveScript, loadScript);
/* 
 * If you do not want to override caching use 
const adtoniq = new Adtoniq(apiKey);
 */


// 
// Handlers
// 

// Handle Adtoniq refresh calls
// This URL can be costumized
app.post('/', function(req, res) {
  adtoniq.processRequest(req.body, (headCode) => {
    res.send('Ok');
  })
})

// Example using direct HTML
app.get('/', function(req, res) {
  adtoniq.getHeadCode({}, (headCode) => {
    const data = getDemoData(headCode)
    // Render using plaing HTML generated here
    const html = getHTML(data, res)
    //sleep(30000);
    res.send(html)
  })
})

// Example using jade
app.get('/jadedemo', function(req, res) {
  adtoniq.getHeadCode({}, (headCode) => {
    const data = getDemoData(headCode)
    // Render using jade template 'views/demo.jade'
    res.render('demo', data)
  })
})


// Gets data for demo page
function getDemoData(headCode) {
  var head = fs.readFileSync('head.html', 'utf8')
  var body = fs.readFileSync('body.html', 'utf8')
  const data = {
    title: 'Adtoniq demo'
    , headCode: headCode
    , head: head
    , body: body
  }
  return data
}

// Generates HTML for demo data
function getHTML(data, res) {
  var html = `<html>
  <head>
  ${data.headCode}
  ${data.head}
  </head>
  <body>
  ${data.body}
  </body>
  </html>
  `
  return html
}

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
