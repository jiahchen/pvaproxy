'use strict';

const express = require('express');
const router = new express.Router();
const logger = require('log4js').getLogger(require('path').basename(__filename));
const Count = require('../model/count');

router.get('/:service/:apikey', function(req, res) {
  const count = new Count();
  let service = req.params.service;
  let apikey = req.params.apikey;
  count.on('error', function(err) {
    logger.error(err);
    res.status(500).send('internal server error - fail to get available count');
  });

  count.getCount(service, apikey, function(errCode, errMessage, result) {
    res.status(errCode? errCode: 200).send(errCode? (errMessage? errMessage: 'fail to get available count'):
                                                                               result);
  });
});

module.exports = router;
