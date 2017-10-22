'use strict';

const http = require('http');
const logger = require('log4js').getLogger(require('path').basename(__filename));
const EventEmitter = require('events');
const config = require('./config.js');
const Validation = require('./validation.js')

/**
 * @classdesc SMS Proxy Count class
 */
class PhoneNumber extends EventEmitter {
  getNumber(service, apikey, callback) {
    const validation = new Validation();
    validation.checkService(service, function(err, serviceID) {
      if(err) {
        callback(400, 'Invalid service');
      }else {
        validation.checkApikey(apikey, function(err) {
          if(err) {
            callback(403, 'Invalid APIkey');
          }else {
            validation.checkBalance(serviceID, function(err) {
              if(err) {
                callback(500);
              }else {
                getNumberQuery(serviceID, callback);
              }
            });
          }
        });
      }
    });
  }
}

function getNumberQuery(serviceID, callback) {
  let options = {
    'method': 'GET',
    'hostname': config.URL,
    'port': null,
    'path': '/priemnik.php?metod='+config.METHOD.get_number+
                          '&country=RU'+
                          '&service='+serviceID+
                          '&id=1'+
                          '&apikey='+config.APIKEY,
    'headers': {
      'cache-control': 'no-cache',
    },
  };
  let req = http.request(options, function(res) {
    let chunks = [];
    res.on('data', function(chunk) {
      chunks.push(chunk);
    });
    res.on('end', function() {
      let body = Buffer.concat(chunks);
      let data = JSON.parse(body.toString());
      let result = {};
      logger.info('get available phone number RES: '+JSON.stringify(data));
      if(data.hasOwnProperty('response')) {
        if(data.response === '1') {
          result.id = data.id;
          result.number = data.number;
          result.countrycode = data.CountryCode;
          callback(null, null, result);
        }else {
          callback(500);
        }
      } else {
        callback(500);
      }
    });
  });
  req.end();
}

module.exports = PhoneNumber;
