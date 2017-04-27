/**
 * Copyright (C) 2017-2020 Information & Communications Research Laboratories,
 *                         Industrial Technology Research Institute
 */

var express = require('express');
var path = require('path');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var root = require('./routes/root');
var logger = log4js.getLogger(path.basename(__filename));
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', root);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) { // jshint ignore:line
  // Handle all unhandled error

  // Log the error
  logger.error(err);

  // only providing error in development
  var message = 'development' === req.app.get('env')? err.message :
                                  'internal server error';

  // render the error page
  res.status(err.status || 500).send(message);
});

module.exports = app;
