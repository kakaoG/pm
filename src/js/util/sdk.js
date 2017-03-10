import browsers from './browsers'
import ImagePreview from '../element/view/image-preview'
import Log from './Log'

const SDK = () => {
//预览图片接口
  let wxPreviewImage =
    (current, images) => {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: images // 需要预览的图片http链接列表
      });
    }
  let previewImage =
    (current, images) => {
      let imagePreview = ImagePreview(current, images);
      imagePreview.preview();
    }
// 拍照或从手机相册中选图接口
  let wxChooseImage =
    (options) => {
      /**
       * wx.chooseImage({
       *   count: 1, // 默认9
       *   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
       *   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
       *   success: function (res) {
       *       var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
       *   }
       * });
       */
    }
  let chooseImage =
    (options) => {

    }
// 上传图片接口
//wx.uploadImage({
//  content: '', // 需要上传的图片的本地ID，由file获得
//  isShowProgressTips: 1, // 默认为1，显示进度提示
//  success: function (res) {
//    var serverId = res.serverId; // 返回图片的服务器端ID
//  }
//});
  let wxUploadImage =
    (options) => {
      wx.uploadImage(options);
    }
  let uploadImage =
    (options) => {
    }
  // 扫一扫
  //wx.scanQRCode({
  //  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  //  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
  //  success: function (res) {
  //    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
  //  }
  //});
  let wxScanQRCode = (options) => {
    wx.scanQRCode(options);
  }
//是否是微信
  let isWeixin = false;
  if (browsers.weixin && wx) {
    isWeixin = true;
  }

  // 注册微信分享接口

  return {
    // 预览图片接口
    previewImage(current, images){
      if (isWeixin) {
        wxPreviewImage(current, images);
      } else {
        previewImage(current, images);
      }
    },
    chooseImage(options){
      if (isWeixin) {
        wxChooseImage(current, images);
      } else {
        chooseImage(current, images);
      }
    },
    uploadImage(options){
      if (isWeixin) {
        wxUploadImage(options);
      } else {
        uploadImage(options);
      }
    },
    scanQRCode(options){
      if (isWeixin) {
        options = _.extend({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          //success: function (res) {
          //  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          //  Log.log('wxScanQRCode', result);
          //}
        }, options);
        options.success = _.wrap(options.success, function (func, res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          Log.log('wxScanQRCode', result);
          func && func(result);
        });
        wxScanQRCode(options);
      } else {

      }
    },
    // 分享到朋友圈
    onMenuShareTimeline(success, cancel) {
      if(isWeixin){
        wx.onMenuShareTimeline({
          title: document.title, // 分享标题
          link: location.href, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            if(success) {
              success('onMenuShareTimeline');
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if(cancel) {
              cancel('onMenuShareTimeline');
            }
          }
        });
      }
    },
    // 分享给朋友
    onMenuShareAppMessage(success, cancel) {
      if(isWeixin){
        wx.onMenuShareAppMessage({
          title: document.title, // 分享标题
          desc: '测试描述', // 分享描述
          link: location.href, // 分享链接
          imgUrl: '', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            if(success) {
              success('onMenuShareAppMessage');
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if(cancel) {
              cancel('onMenuShareAppMessage');
            }
          }
        });
      }
    },
    // 分享到QQ
    onMenuShareQQ(success, cancel) {
      if(isWeixin){
        wx.onMenuShareQQ({
          title: document.title, // 分享标题
          desc: '测试描述', // 分享描述
          link: location.href, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            if(success) {
              success('onMenuShareAppMessage');
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if(cancel) {
              cancel('onMenuShareAppMessage');
            }
          }
        });
      }
    },
    // 分享到腾讯微博
    onMenuShareWeibo(success, cancel) {
      if(isWeixin){
        wx.onMenuShareWeibo({
          title: document.title, // 分享标题
          desc: '测试描述', // 分享描述
          link: location.href, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            if(success) {
              success('onMenuShareWeibo');
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if(cancel) {
              cancel('onMenuShareWeibo');
            }
          }
        });
      }
    },
    // 分享到QQ空间
    onMenuShareQZone(success, cancel) {
      if(isWeixin){
        wx.onMenuShareQZone({
          title: document.title, // 分享标题
          desc: '测试描述', // 分享描述
          link: location.href, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            if(success) {
              success('onMenuShareQZone');
            }
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            if(cancel) {
              cancel('onMenuShareQZone');
            }
          }
        });
      }
    }
  }
}
export default SDK();