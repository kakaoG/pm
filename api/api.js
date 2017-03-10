var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = module.exports = express();
var proxyWeb = require('express-http-proxy');
var _ = require('lodash')
var compression = require('compression');
var fs = require('fs');
var multer = require('multer');

var getBody = require('raw-body')
var typer = require('media-typer')

api.use(logger('dev'));
api.use(compression());
api.use(bodyParser.json({"limit": "100000kb"})); // for parsing application/json
api.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//api.use(multer()); // for parsing multipart/form-data

//api.use(function (req, res, next) {
//  getBody(req,{
//    length: req.headers['content-length'],
//    limit: '10mb',
//    encoding: typer.parse(req.headers['content-type']).parameters.charset
//  }, function (err, string) {
//    if (err) return next(err)
//    console.log(err, string)
//    next();
//  });
//  //var contentType = req.header('Content-Type');
//  //if(/json/.test(contentType)) {
//  //  //req.body = JSON.parse(req.body)
//  //}
//});

//require('./shoppingMall/routes')(api);
//require('./guide/routes')(api);
require('./market/routes')(api);
//require('./shoppingMall/routes')(api);
//require('./user/routes')(api);
//require('./merchant/routes')(api);
//require('./review/routes')(api);
// require('./product/routes')(api);
//require('./auth/routes')(api);
//require('./coupon/routes')(api);
var url = 'http://172.16.10.27';
var urlPre = '';
//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    dirpath.split(path.sep).forEach(function (dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      }
      else {
        pathtmp = dirname;
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false;
        }
      }
    });
  }
  return true;
}
var decorateRequest = function(proxyReq, originalReq) {
  var bodyContent = [];
  _.forIn(proxyReq.bodyContent, function (item, key) {
    bodyContent.push(key + '=' + item);
  });
  proxyReq.bodyContent = bodyContent.join('&');
  return proxyReq;
}
// 优惠券配置
// 领券
api.use('/api/coupon/**', proxyWeb('http://api.promotion.test.rs.com:8080', {
  forwardPath: function (req, res) {
    var url =  req.originalUrl.substring('/api/coupon'.length);
    console.log('url', url);
    return url;
  },
  decorateRequest: decorateRequest
}));
// 用户中心配置
api.use('/api/uc/**', proxyWeb(url, {
  forwardPath: function (req, res) {
    var url = urlPre + req.originalUrl;
    return url;
  },
  preserveHostHdr: true,
  decorateRequest: decorateRequest
}));
//url = 'http://192.168.225.224/';
//urlPre = '';
api.use('/t/**', proxyWeb(url, {
  forwardPath: function (req, res) {
    var url = '/api/m/code' + req.originalUrl.substring(2);
    return url;
  }
}));
api.use('/api/m-web/**', proxyWeb(url, {
  forwardPath: function (req, res) {
    var url = urlPre + req.originalUrl;
    return url;
  },
  // 不稳定
  //intercept: function (rsp, data, req, res, callback) {
  //  // rsp - original response from the target
  //  data = JSON.parse(data.toString('utf8'));
  //  try {
  //    var name = req.originalUrl;
  //    if (name && name != '/') {
  //      var paths = name.split('/');
  //      paths = paths.slice(2, paths.length - 1);
  //      var dirPath = __dirname;
  //      // 创建目录
  //      paths.forEach(function (item) {
  //        dirPath += '/' + item;
  //        if (!fs.existsSync(dirPath)) {
  //          fs.mkdir(dirPath);
  //        }
  //      })
  //      // 创建文件
  //      var names = name.split('/');
  //      var file = __dirname + '/' + names.slice(2, names.length).join('/');
  //      console.log('write file %s', file);
  //      fs.writeFile(file + '.json', JSON.stringify(data, null, 2));
  //    }
  //  } catch (e) {
  //  }
  //  callback(null, JSON.stringify(data));
  //}
}))
module.exports = api;
