/**
 * 上传组件
 **/
import Backbone from 'backbone'


import storage from '../../util/storage'
import browsers from '../../util/browsers'
import api from '../../api/api'
import sdk from '../../util/sdk'

let UploadModel = Backbone.Model.extend({
  url: api.getUrl(api.review.upload)
});
var LayoutView = Backbone.View.extend({
  events: {},
  //
  initialize: function (options, config) {
    var t = this;
  },
  clear: function () {
    storage.session.set('wxLocalIds', []);
  },
  remove: function (fileUrl) {
    var uploadFiles = storage.session.get('wxLocalIds') || [];
    _.find(uploadFiles, function (item, index) {
      if (item.localId == fileUrl) {
        uploadFiles = uploadFiles.slice(0, index).concat(uploadFiles.slice(index + 1, uploadFiles.length));
        storage.session.set('wxLocalIds', uploadFiles);
        return true;
      }
    });
  },
  getUploadFiles: function () {
    var cachedImageIds = storage.session.get('wxLocalIds') || [];
    return _.map(cachedImageIds, function (item) {
      return item.localId;
    });
  },
  getServerIds: function () {
    var cachedImageIds = storage.session.get('wxLocalIds') || [];
    return _.map(cachedImageIds, function (item) {
      return item.serverId;
    });
  },
  setUploadFiles: function (localIds) {
    storage.session.set('wxLocalIds', localIds);
  },
  getSessionFiles: function () {
    return storage.session.get('wxLocalIds') || [];
  },
  upload2WX: function (fileList, callback, srcFileList) {
    var t = this;
    if (!srcFileList) {
      srcFileList = _.clone(fileList);
    }
    var uploadFile = fileList.pop();
    if (uploadFile) {
      // 上传图片至微信服务器.
      wx.uploadImage({
        localId: uploadFile.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          uploadFile.serverId = res.serverId; // 返回图片的服务器端ID
          var wxLocalIds = t.getSessionFiles();
          wxLocalIds.push(uploadFile);
          t.setUploadFiles(wxLocalIds);
          // 递归调用上传
          t.upload2WX(fileList, callback, srcFileList);
        }
      });
    } else {
      // 全部上传成功将调用回调函数
      callback(srcFileList);
    }
  },
  // 上传至文件服务器(浏览器的场合)
  upload2Server: function (fileList, callback, srcFileList) {
    var t = this;
    if (!srcFileList) {
      srcFileList = _.clone(fileList);
    }
    var uploadFile = fileList.pop();
    if (uploadFile) {
      // 上传图片至服务器.
      let uploadModel = new UploadModel();
      let fileExts = uploadFile.id.split('.');

      uploadModel.save({
        fileStr: uploadFile.localId.split(',')[1],
        fileExt: '.' + fileExts[fileExts.length - 1]
      }, {
        success: function (resModel) {
          uploadFile.serverId = resModel.toJSON().imgUrl; // 返回图片的服务器端ID
          var wxLocalIds = t.getSessionFiles();
          wxLocalIds.push(uploadFile);
          t.setUploadFiles(wxLocalIds);
          // 递归调用上传
          t.upload2Server(fileList, callback, srcFileList);
        }
      });
    } else {
      // 全部上传成功将调用回调函数
      callback(srcFileList);
    }
  },
  upload: function (fnCallback, files) {
    var t = this;
    var callback = function (uploadFiles) {
      fnCallback(uploadFiles);
    }
    //callback([{localId: '1.jpg'}]);return;
    // 微信的场合
    if ($nvwa && browsers.isWeixin() && wx) {
      var cachedImageIds = storage.session.get('wxLocalIds') || [];
      var count = 9 - cachedImageIds.length;
      wx && wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = _.map(res.localIds, function (localId) {
            return {
              id: localId,
              localId: localId,
              serverId: ''
            }
          }); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          //cachedImageIds = cachedImageIds.concat(localIds);
          //storage.session.set('wxLocalIds', cachedImageIds);
          // 上传文件
          t.upload2WX(localIds, callback);
        }
      });
    } else {
      // 非微信的场合
      if (files) {
        let selectSuccess = (files) => {
          // 上传文件
          t.trigger('upload:start');
          t.upload2Server(files, callback);
        };
        let filesCount = files.length;
        let uploadFiles = [];
        _.each(files, function (file) {
          // 不是图片跳出
          if (file.type.indexOf('image') == -1) {
            return;
          }
          let fileReader = new FileReader();
          fileReader.onload = function (event) {
            // 上传文件
            uploadFiles.push({
              id: file.name,
              localId: event.target.result,
              serverId: ''
            });
            filesCount--;
            // 全部读取完毕,上传文件
            if (filesCount == 0) {
              selectSuccess(uploadFiles);
            }
          };
          fileReader.onprogress = (function (event) {
            console.log('onprogress', event);
          });
          fileReader.readAsDataURL(file);
        });
      }
    }
  }
});
export default LayoutView;