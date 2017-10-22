'use strict';

const http = require('http');
const logger = require('log4js').getLogger(require('path').basename(__filename));
const EventEmitter = require('events');
const config = require('./config.js');
const Validation = require('./validation.js')

/**
 * @classdesc SMS Proxy Count class
 */
class Count extends EventEmitter {
  getCount(service, apikey, callback) {
    const validation = new Validation();
    validation.checkService(service, function(err, serviceID) {
      if(err) {
        callback(400, 'Invalid service');
      }else {
        validation.checkApikey(apikey, function(err) {
          if(err) {
            callback(403, 'Invalid APIkey');
          }else {
            getCountQuery(service, serviceID, callback);
          }
        });
      }
    });
  }
}

function getCountQuery(service, serviceID, callback) {
  let options = {
    'method': 'GET',
    'hostname': config.URL,
    'port': null,
    'path': '/priemnik.php?metod='+config.METHOD.get_count+
                          '&service='+serviceID+
                          '&apikey='+config.APIKEY+
                          '&country=RU',
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
      logger.info('get available count RES: '+JSON.stringify(data));
      if(data.hasOwnProperty('online')) {
        result.service = service;
        result.availableCount = data.online;
      }
      callback(null, null, result);
    });
  });
  req.end();
}

module.exports = Count;
