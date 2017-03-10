/**
 * Community 模块 API
 * M站-点评
 * @return {[type]} [description]
 */
import http from '../util/http'
import header from '../util/header'


var _basePath = '/API/review';
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
   * 点评点赞
   * @param merchantId 店铺ID
   * @param type
   *      Add 点赞
   *      Cancel 取消点赞
   */
  praise: function (merchantId, type, success, error) {
    var t = this;
    var url = _basePath + '/#merchantId#/praise';
    url = url.replace('#merchantId#', merchantId);
    var data = {
      type: type
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 写点评
   * @param merchantId 店铺ID
   * @param content 评论内容
   * @param imgUrl 图片地址
   * @param detail 点评标签分数
   */
  addReview: function (merchantId, content, imgUrl, detail, success, error) {
    var t = this;
    var url = _basePath + '/#id#/addReview';
    url = url.replace('#id#', merchantId);
    if (_.isObject(imgUrl)) {
      imgUrl = JSON.stringify(imgUrl);
    }
    if (_.isObject(detail)) {
      detail = JSON.stringify(detail);
    }
    var data = {
      content: content,
      imgUrl: imgUrl,
      detail: detail,
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  }
};
export default CommunityApi;