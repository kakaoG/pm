var cookie = require('./util/cookie')
require('./util/string')

import app from './core/hx-app'

/**
 * index
 */
var Index = function () {
  return {
    init: function () {
      //定义全局的Debug模式
      window._debug = "true";
      window._log = function () {
        if (window._debug && console) {
          return console.log.apply(console, arguments);
        }
      };

      cookie.default();

        app.start();
    },
    initBackEvent: function () {
      var t = this;
    }
  };
};

module.exports = Index();