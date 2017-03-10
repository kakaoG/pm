/**
 * Community 模块 API
 * M站-用户
 * @return {[type]} [description]
 */
import http from '../util/http'
import header from '../util/header'
var _basePath = '/API/user';
var __debug = false;
var CommunityApi = {
  initialize: function () {
  },
  _executeRequest: function (url, data, handler, isJsonp, method, async) {
    if (__debug) {
      if (MockData[url]) {
        handler(MockData[url](url, data));
      } else {
        console.warn('Fill mock data in mockdata.js!');
      }
    } else {
      http.request(url, data, handler, isJsonp, method, async);
    }
  },
  _executeResponse: function (response, success, error) {
    if (response && response.ok) {
      if (success) {
        //return success function
        success(response.dataMap);
      }
    } else {
      if (error) {
        //return error function
        error(response.code, response.message);
      }
    }
  },
  commentList: function (page, pageSize, success, error) {
    var t = this;
    var url = _basePath + '/commentList';
    var data = {
      page: page,
      pageSize: pageSize
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 获取验证码（注册，忘记密码，修改密码共用）
   * @param mobile 登录名
   * @param smsType 短信类型
   *      注册=register；找回密码=retrievePassword；
   *      修改密码=retrievePassword；快捷登陆=shortcutLogin
   */
  sendMsg: function (mobile, smsType, success, error) {
    var t = this;
    var url = _basePath + '/sendMsg';
    var data = {
      mobile: mobile,
      smsType: smsType
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 获取用户信息
   * @param success
   * @param error
   */
  userInfo: function (success, error) {
    var t = this;
    var url = _basePath + '/userInfo';
    //发送http psot请求
    t._executeRequest(url, {}, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  }
};
export default CommunityApi;