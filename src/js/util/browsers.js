let u = navigator.userAgent;
let appVersion = navigator.appVersion;
const browsers = {
  //是否是微信
  isWeixin: function () {
    if (u.match(/MicroMessenger/i) == "MicroMessenger") {
      return true;
    } else {
      return false;
    }
  },
  weixin: !!u.match(/MicroMessenger/i),
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
  iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
  iPad: u.indexOf('iPad') > -1, //是否iPad
};
export default browsers;