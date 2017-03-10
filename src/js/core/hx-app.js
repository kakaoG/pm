/**
 * FW
 */
import Router from '../m/router'
import Backbone from 'backbone'

import consts from '../util/consts'
import nprogress from 'nprogress'
import sdk from '../util/sdk'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import AuthApi from  '../api/auth'
import browsers from '../util/browsers'
import api from '../api/api'
import role from '../util/role'
import Log from '../util/Log'
import config from './config'
import SiteCatalog from '../util/SiteCatalog'
import uuid from 'node-uuid'
import storage from '../util/storage'

let userObject = 'weixin';
if(!browsers.weixin) {
  userObject = 'browser';
}
let validWx = function () {
  let ShareModel = Backbone.Model.extend({
    url: api.getUrl(api.review.share)
  });

  let sendShareMessageSuccess = () => {
    let shareModel = new ShareModel();
    let options = {
      linkUrl: location.href,
      userObject: userObject,
      objectId: uuid.v4(),
      objectType: 'url'
    }
    shareModel.set(options);
    shareModel.save();
  }
  let sendShareMessageCancel = (msg) => {
  }
  let registWxShare = () => {
    sdk.onMenuShareAppMessage(sendShareMessageSuccess, sendShareMessageCancel);
    sdk.onMenuShareQQ(sendShareMessageSuccess, sendShareMessageCancel);
    sdk.onMenuShareQZone(sendShareMessageSuccess, sendShareMessageCancel);
    sdk.onMenuShareTimeline(sendShareMessageSuccess, sendShareMessageCancel);
    sdk.onMenuShareWeibo(sendShareMessageSuccess, sendShareMessageCancel);
  }
  let success = function (data) {
    let wxConfig = _.extend({
      debug: false,
      jsApiList: _.keys(sdk)
    }, data.get('dataMap').data);
    wxConfig.timestamp = parseInt(wxConfig.timestamp);
    // 确认微信授权
    wx.config(wxConfig);
    registWxShare();
  }
  let Model = Backbone.Model.extend({
    urlRoot: api.getUrl(api.auth.wx.signature)
  });
  let wxModel = new Model();
  wxModel.set('url', 'https://m.mmall.com');
  wxModel.save(null, {
    success: success
  });
};

let App = {
  start: function () {
    FastClick.attach(document.body);
    validWx();
    if (browsers.isWeixin() && wx) {
      validWx();
    } else {
      $('#container').addClass('container');
      $('body').addClass('browser');
    }
    nprogress.configure({
      showSpinner: true
    });
    Backbone.View.prototype.delegate = _.wrap(Backbone.View.prototype.delegate, function (func, match1, match2, deleFunc) {
      let wrapedDeleFunc = _.wrap(deleFunc, function (deleFunc, e) {
        if(e && e.type == 'click') {
          let siteCatalog = new SiteCatalog(e.currentTarget);
          siteCatalog.clickEvent();
        }
        deleFunc.call(this, e);
      });
      return func.call(this, match1, match2, wrapedDeleFunc)
    });
    var netCommunicationChannel = Backbone.Radio.channel(consts.radio.net_communication);
    Backbone.sync = _.wrap(Backbone.sync, function (sync, method, model, options) {
      if(!options.emulateJSON) {
        options.contentType = 'application/json';
      }
      if (!options.emulateJSON && (method != 'read' || options.method)) {
        let modelData = model.toJSON();
        // 如果删除Id,将不能传递参数id
        //delete modelData.id;
        if (options.data) {
          modelData = _.extend(modelData, options.data);
        }
        if (!_.isEmpty(modelData)) {
          options.data = JSON.stringify(modelData);
        }
      }
      let successFunc = options.success;
      let errorFunc = options.error;
      let bizErrFunc = options.bizError;
      options.success = _.wrap(successFunc, function (func, data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          if (data.code != 0 && data.code != 200) {
            if(data.code == -401) {
              // 未登录
              netCommunicationChannel.request(consts.radio.net_error_401, jqXHR, textStatus);
            } else {
              nprogress.done();
              if(bizErrFunc) {
                bizErrFunc.call(this, data);
              } else {
                netCommunicationChannel.request(consts.radio.net_success_error, data, textStatus, jqXHR);
              }
              model.trigger('biz.err', data);
              //if(_.isFunction(errorFunc)) {Log.log('errorFunc', errorFunc);
              //  errorFunc(data.code);
              //} else {
              //  netCommunicationChannel.request(consts.radio.net_success_error, data, textStatus, jqXHR);
              //}
            }
          } else {
            netCommunicationChannel.request(consts.radio.net_success_ok, data, textStatus, jqXHR);
            func.call(this, data.dataMap, textStatus, jqXHR);
          }
        }
      });
      options.error = _.wrap(errorFunc, function (func, jqXHR, textStatus, errorThrown) {
        nprogress.done();
        if (textStatus == 'timeout') {
          _log('timeout');
        }
        if (textStatus == 'error') {
          _log('error');
        }
        if (textStatus == 'abort') {
          _log('abort');
        }
        if (textStatus == 'parsererror') {
          _log('parsererror');
        }
        switch (jqXHR.status) {
          case 401:
            netCommunicationChannel.request(consts.radio.net_error_401, jqXHR, textStatus, errorThrown);
            break;
          case 500:
            netCommunicationChannel.request(consts.radio.net_error_500, jqXHR, textStatus, errorThrown);
            break;
        }
        func.call(this, jqXHR.status);
      });
      return sync.call(this, method, model, options);
    });
    var router = new Router();
    router.on('route', function (v1, v2) {
      if(window.iSliderViewTemplate) {
        iSliderViewTemplate.remove();
      }
      // 前页地址
      let referrer = storage.session.get('referrer');
      if(referrer) {
        config.referrer = referrer;
      }
      storage.session.set('referrer', location.href);
      eventChannel.request(consts.radio.event_enter_router);
    });
    eventChannel.reply(consts.radio.event_navigate, function (route, config) {
      if (!role.isLogin(config)) {
        router.navigate('register/' + encodeURIComponent(location.href), {
          trigger: true
        });
        return;
      }
      let param = _.extend({
        trigger: true
      }, config);
      router.navigate(route, param);
    });
    window.router = router;
    Backbone.history.start();
  }
};
export default App;
