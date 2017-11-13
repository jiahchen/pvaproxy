'use strict';

const config = {
  URL: 'smspva.com',
  PATH: '/priemnik.php?',
  METHOD: {
    get_balance: 'get_balance',
    get_count: 'get_count_new',
    get_number: 'get_number',
    get_sms: 'get_sms',
    cancel: 'denial',
    ban: 'ban',
  },
  SERVICE: {
    wechat: 'opt67',
  },
  APIKEY: '6XDqN27EixXLCdITdZOnz0slRXUrQW',
  customAPIKEY: 'b25fcf52-67e0-4c5f-a3f4-b4567f7fd481',
};

module.exports = config;
