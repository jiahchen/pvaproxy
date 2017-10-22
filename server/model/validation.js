'use strict';

const http = require('http');
const logger = require('log4js').getLogger(require('path').basename(__filename));
const EventEmitter = require('events');
const config = require('./config.js');

/**
 * @classdesc SMS Proxy Count class
 */
class Validation extends EventEmitter {
  checkBalance(serviceID, callback) {
    let options = {
      'method': 'GET',
      'hostname': config.URL,
      'port': null,
      'path': '/priemnik.php?metod='+config.METHOD.get_balance+
                            '&service='+serviceID+
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
        logger.info('get balance RES: '+JSON.stringify(data));
        if(data.hasOwnProperty('response')) {
          if(data.response === '1') {
            if(parseFloat(data.balance) > 1) {
              callback();
            }else {
              logger.error('balance not enough');
              callback(500);
            }
          }else {
            logger.error('response not 1');
            callback(500);
          }
        }else {
          logger.error('another error');
          callback(500);
        }
      });
    });
    req.end();
  }

  checkService(service, callback) {
    if(service === 'wechat') {
      callback(null, 'opt67');
    }else {
      callback(400);
    }
  }

  checkApikey(apikey, callback) {
    if(apikey === config.customAPIKEY) {
      callback(null);
    }else {
      callback(403);
    }
  }
}

module.exports = Validation;
