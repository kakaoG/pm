/**
 * Community 模块 API
 * M站-商户
 * @return {[type]} [description]
 */
import http from '../util/http'
import header from '../util/header'

var _basePath = '/API/merchant';
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
   * 上传点评图片
   *
   */
  uploadImg: function (mediaId, success, error) {
    var t = this;
    var url = _basePath + '/uploadImg';
    var data = {
      mediaId: mediaId
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * detail/QRcode
   * 获取商户店铺详情
   */
  getDetailQRcode: function (qrCode, page, pageSize, success, error) {
    var t = this;
    if (!qrCode) {
      error(1001, '用户编号没有输入');
      return;
    }
    var url = _basePath + '/detail/' + qrCode;
    var data = {
      page: page,
      pageSize: pageSize,
      dataSK: 'shop_' + qrCode,
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * collection
   * 收藏/取消收藏
   * @param merchantId 商户id
   * @param type 类型,Add-收藏 Cancel-取消收藏
   */
  collection: function (merchantId, type, success, error) {
    var t = this;
    if (!merchantId || !type) {
      error(1002, '商户没有输入');
      return;
    }
    var url = _basePath + '/collection';
    var data = {
      merchantId: merchantId,
      type: type
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * reviewList
   * 获取点评列表
   */
  reviewList: function (merchantId, page, pageSize, success, error) {
    var t = this;
    var url = _basePath + '/' + merchantId + '/reviewList';
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
   * 统计uv
   * @param merchantId 店铺ID
   */
  userView: function (merchantId) {
    var t = this;
    var url = _basePath + '/userView';
    var data = {
      dataSK: 'shop_' + merchantId,
      action: Date.now()
    };
    var success = function (data) {

    };
    var error = function (code, msg) {

    }
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 统计接口 统计PV
   * @param merchantId 店铺ID
   */
  pageView: function (merchantId) {
    var t = this;
    var url = _basePath + '/pageView';
    var data = {
      dataSK: 'shop_' + merchantId,
      action: Date.now()
    };
    var success = function (data) {

    };
    var error = function (code, msg) {

    }
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
  /**
   * 统计接口 统计PV
   * @param merchantId 店铺ID
   */
  userViewCount: function (merchantId, success, error) {
    var t = this;
    var url = _basePath + '/userViewCount';
    var data = {
      dataSK: 'shop_' + merchantId
    };
    //发送http psot请求
    t._executeRequest(url, data, function (response) {
      //返回的http请求数据
      t._executeResponse(response, success, error);
    }, false, 'POST', false, header.getHeaders());
  },
};
export default CommunityApi;