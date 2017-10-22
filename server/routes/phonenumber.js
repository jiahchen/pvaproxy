'use strict';

const express = require('express');
const router = new express.Router();
const logger = require('log4js').getLogger(require('path').basename(__filename));
const PhoneNumber = require('../model/phonenumber');

router.get('/:service/:apikey', function(req, res) {
  const phonenum = new PhoneNumber();
  let service = req.params.service;
  let apikey = req.params.apikey;
  phonenum.on('error', function(err) {
    logger.error(err);
    res.status(500).send('internal server error - fail to get phone number');
  });

  phonenum.getNumber(service, apikey, function(errCode, errMessage, result) {
    res.status(errCode? errCode: 200).send(errCode? (errMessage? errMessage: 'fail to get phone number'):
                                                                               result);
  });
});

module.exports = router;
