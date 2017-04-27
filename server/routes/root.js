var path = require('path');
var log4js = require('log4js');

var express = require('express');
var router = new express.Router();

var logger = log4js.getLogger(path.basename(__filename));
router.use('/', express.static(__dirname + '/../../front'));

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
