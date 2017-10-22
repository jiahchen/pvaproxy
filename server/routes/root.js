var path = require('path');
var log4js = require('log4js');

var express = require('express');
var router = new express.Router();

var logger = log4js.getLogger(path.basename(__filename));
router.use('/', express.static(__dirname + '/../../front'));

/* logging for all requests */
router.use(function(req, res, next) {
  if (process.env.DEBUG) {
    logger.debug('server receives a request: ');
    logger.debug('  method: %s', req.method);
    logger.debug('  url: %s', req.url);
    if (req.headers['content-type']) {
      logger.debug('  content-type: %s', req.headers['content-type']);
    }
    if (req.body) {
      logger.debug('  body: %s', JSON.stringify(req.body));
    }
  }
  next();
});

router.use('/count', require('./count'));
router.use('/phonenumber', require('./phonenumber'));
// router.use('/sms', require('./sms'));
// router.use('/cancel', require('./cancel'));
// router.use('/ban', require('./ban'));

/* return 404 for other queries */
router.all('*', function(req, res) {
  logger.error('the request is not supported');
  if (req && req.method) {
    logger.error('  method: %s', req.method);
  }
  if (req && req.url) {
    logger.error('  url: %s', req.url);
  }
  res.status(404).send('Not Found');
});

module.exports = router;
