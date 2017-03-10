/**
 * Community 模块 API
 * M站-授权
 * @return {[type]} [description]
 */
import http from '../util/http'
import header from '../util/header'

var _basePath = '/API/auth';
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
  /**
   * 登录
   */
  login: function (userId, pwd, success, error) {
    var t = this;
    var url = _basePath + '/login';
    var data = {
      mobile: userId,
      password: pwd
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  logout: function (success, error) {
    var t = this;
    var url = _basePath + '/logout';
    var data = {};
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 注册
   */
  register: function (mobile, code, pwd, success, error) {
    var t = this;
    var url = _basePath + '/register';
    var data = {
      mobile: mobile,
      smsCode: code,
      newPassword: pwd
    };
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   *重置密码
   * @param mobile
   * @param smsCode
   * @param newPassword
   */
  resetPassword: function (mobile, smsCode, newPassword, success, error) {
    var t = this;
    var url = _basePath + '/resetPassword';
    var data = {
      mobile: mobile,
      smsCode: smsCode,
      newPassword: newPassword
    };
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  wxGetSignature: function (params, success, error) {
    var t = this;
    var url = _basePath + '/wx/get-signature';
    var data = _.extend({url: ''}, params);
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  }
};
export default CommunityApi;