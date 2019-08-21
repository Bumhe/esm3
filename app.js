var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');

//initialize passport first


// [SH] Bring in the routes for the API (delete the default routes)
var apiRouter = require('./api/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/ecwa-youth')));
app.use('/', express.static(path.join(__dirname, 'dist/ecwa-youth')));
app.use(passport.initialize());
app.use('/api', apiRouter);

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
  res.send(err.status);
});

module.exports = app;