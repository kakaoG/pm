/**
 * 基础View类
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'

import AlertUI from '../components/alert-ui'
import consts from '../util/consts'
import browsers from '../util/browsers'
import SlideContainerView from '../element/view/slide-container-view'
import SiteCatalog from '../util/SiteCatalog'
import config from '../core/config'
import Log from '../util/Log'
import role from '../util/role'
import api from '../api/api'
var dialog_toast_warn_tpl = '<div class="dialog"><div class="iconfont icon-dianpingwarn2"></div><#=msg#></div>';
var dialog_toast_success_tpl = '<div class="dialog"><div class="iconfont icon-dianpingtickhollow"></div><#=msg#></div>';
var tipsAlert = tipsAlert || new AlertUI();
import Messages from '../messages/messages'
let Model = Backbone.Model.extend({
  url: api.getUrl(api.user.uc.profile, api.user.uc.contextPath) + '?appId=' + config.uc.appId,
  getUserInfo(){
    return this.toJSON()
  }
});
nprogress.configure({
  showSpinner: false
});
var eventChannel = Backbone.Radio.channel(consts.radio.event);
var netCommunicationChannel = Backbone.Radio.channel(consts.radio.net_communication);
var Helper = ({
  createView(props){
    let p = _.extend({}, props, Helper);
    if (!p.destroy) {
      p.destroy = p._destroy;
    }
    if (p.initialize) {
      p.initialize = _.wrap(p.initialize, function (func, options, config) {
        this.on('destroy', this.destroy);
        func.apply(this, options, config);
      });
    }
    let View = Backbone.View.extend(p);
    return View;
  },
  _destroy(){
    let t = this;
    for (var key in this) {
      let view = this[key];
      if (view instanceof Backbone.View) {
        view.trigger('destroy');
        if (view.destroy) {
          view.destroy();
        } else {
          view.remove()
        }
      }
    }
    t.remove();
  },
  init(){
    var t = this;
    t.on('destroy', t.destroy || t._destroy);
  },
  proxyLink($el){
    $el = $el || $('body');
    $el.find('a:link').off('click').on('click', function (e) {
      e.preventDefault();
      // 埋点处理
      let extOptions = {};
      let elem = e.currentTarget;
      let siteCatalog = new SiteCatalog(elem);
      siteCatalog.clickEvent();

      let link = elem.href;
      // javascript
      if(/^javascript/.test(link)) {
        // 不处理
        return;
      }
      // url
      if(/^(http:|https:)?\/\//.test(link)) {
        if(!/^http/.test((link))) {
          link = location.protocol + '//' + link;
        }
      } else {
        // hash
        if(/^#/.test(link)) {
          link = location.origin + location.pathname + link
        } else {
          // uri
          link = location.origin + link
        }
      }
      location.assign(link);
    });
  },
  registerTrigger () {
    netCommunicationChannel.reply(consts.radio.net_success_ok, function (data, status, jqXHR) {
      console.log('net_success_ok')
    });
    netCommunicationChannel.reply(consts.radio.net_success_error, function (data, status, jqXHR) {
      Log.log('net_success_error');
      var msg = Messages.local[data.code] || '';
      if(msg) {
        data.message = msg;
      }
      eventChannel.request(consts.radio.event_dialog_error, data);
    });
    netCommunicationChannel.reply(consts.radio.net_error_401, function (jqXHR, textStatus, errorThrown) {
      console.log('net_error_401')
      //eventChannel.request(consts.radio.event_dialog_error, consts.error.code401);
      // 清除标志
      $nvwa.cookie.setCookie(consts.global_keys.token, '');
      router.navigate('register/' + encodeURIComponent(location.href), {
        trigger: true,
        replace: true
      });
    });
    netCommunicationChannel.reply(consts.radio.net_error_500, function (jqXHR, textStatus, errorThrown) {
      console.log('net_error_500')
      eventChannel.request(consts.radio.event_dialog_error, consts.error.code500);
    });
    eventChannel.reply(consts.radio.event_before_router, Helper.onBeforeRouter);
    eventChannel.reply(consts.radio.event_enter_router, Helper.onEnterRouter);
    eventChannel.reply(consts.radio.event_after_fetch, Helper.onAfterFetch);
    eventChannel.reply(consts.radio.event_dialog_error, Helper.openError);
    eventChannel.reply(consts.radio.event_dialog_toast, Helper.openToast);
    eventChannel.reply(consts.radio.event_dialog_loading, Helper.openLoading);
    eventChannel.reply(consts.radio.event_dialog_close, Helper.closeAlert);
    eventChannel.reply(consts.radio.event_toast_warn, Helper.openToastWarn);
    eventChannel.reply(consts.radio.event_toast_success, Helper.openToastSuccess);
    eventChannel.reply(consts.radio.event_rebuild_image_path, Helper.reBuildImage);
    eventChannel.reply(consts.radio.event_proxy_link, Helper.proxyLink);
    // 设置对话窗口
    eventChannel.reply(consts.radio.event_dialog, function (view, data) {
      let slideContainerView = new SlideContainerView();
      $('.flashes').html(slideContainerView.render().el);
      slideContainerView.show(view, data);
      return slideContainerView;
    });
    // 下载
    eventChannel.reply(consts.radio.event_download, function () {
      //if (browsers.ios) {
      //  // IOS:访问AppStore
      //} else if (browsers.weixin && browsers.android) {
      //  // 微信并且Android:访问下载页面
      //  router.navigate('download', {
      //    trigger: true
      //  });
      //} else if (browsers.android) {
      //  // Android浏览器:访问App下载地址
      //} else {
      //  // 其他情况访问下载页面
      //  router.navigate('download', {
      //    trigger: true
      //  });
      //
      window.location.href = config.download.page;
    });
  },
  isAuth(){
    return !!window.$nvwa.cookie.getCookie(consts.global_keys.token);
  },
  userInfo(){
    if(!role.get()){
      if($nvwa.cookie.getCookie('is_login') == 1 && !role.getToken()){
        $nvwa.cookie.setCookie(consts.global_keys.token, uuid.v4());
      }
      if(role.getToken()){
        let model = new Model();
        model.fetch();
        model.listenTo(model,'change',function(){
          role.save(model.getUserInfo());
        });
      }
    }
  },
  onEnterRouter: function () {
    //var t = this;
    //this.transitioning = false;
    $('body').scrollTop(0);
    Helper.userInfo();
    //nprogress.done();
    //Helper.reBuildImage();
    //let siteCatalog = new SiteCatalog();
    //siteCatalog.pageAndUserView();
  },
  onAfterFetch (catalogOptions) {
    nprogress.done();
    Helper.reBuildImage();
    let siteCatalog = new SiteCatalog();
    siteCatalog.pageAndUserView(catalogOptions);
  },
  onBeforeRouter: function () {
    this.transitioning = true;
    // Don't show for synchronous route changes
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },
  reBuildImage: function (item) {
    // TODO: lazy loading
    var $imgs = null;
    if (item) {
      $imgs = $(item).find('img');
    } else {
      $imgs = $('img');
    }

    $imgs.each(function (index, item) {
      var $item = $(item);
      //$img.on('load', function (e) {
      //  item.src = this.src;
      //});
      $item.on('error', function () {
        var errorPath = '';
        if ($item.data('defaultSrc')) {
          errorPath = $item.data('defaultSrc').replace(/^.*\/img/, config.server.image + '/');
        } else {
          errorPath = config.server.context + '/img/m/morentupian.png';
        }
        item.src = errorPath;
      });
      if (/^\/API/.test(item.src)) {
        return;
      }
      var srcPath = $item.attr('data-src') || $item.attr('data-uploadSrc') || '';
      let width = $item.attr('data-width');
      let height = $item.attr('data-height');
      const reg = /\.\w+$/
      if(srcPath) {
        if(!/^http/.test(srcPath) && !/^\.\//.test(srcPath)) {
          srcPath = config.server.image + srcPath;
        }
        // 获取扩展名
        let extName = srcPath.match(reg);
        if(extName && width && height) {
          let resizePatch = '.' + width + 'x' + height + extName[0];
          srcPath += resizePatch;
        }
        $item.attr('data-original', srcPath);
      }
    });
    $imgs.addClass('lazy').lazyload({threshold : 200});
  },
  openLoading: function () {
    tipsAlert.openLoading({
      content: '加载中...'
    });
  },
  closeAlert: function () {
    setTimeout(function () {
      tipsAlert.close();
    }, 100);
  },
  openToastSuccess: function (msgInfo) {
    var info = {
      callback: msgInfo.callback,
      msg: tpl(dialog_toast_success_tpl, {msg: msgInfo.msg || ''})
    }
    var t = this;

    t.openToast(info);
  },
  openToastWarn: function (msgInfo) {
    var info = {
      callback: msgInfo.callback,
      msg: tpl(dialog_toast_warn_tpl, {msg: msgInfo.msg || ''}),
      code: msgInfo.code
    }
    var t = this;

    t.openToast(info);
  },
  openToast: function (msgInfo) {
    var msg = '';
    var callback = null;
    // 登录信息异常
    //if (msgInfo.code == 401) {
    //  $nvwa.cookie.setCookie('m_token', '');
    //  this.undelegateEvents();
    //  router.navigate('login', {
    //    trigger: true
    //  });
    //  return;
    //}
    if (msgInfo) {
      msg = msgInfo.msg || '';
      callback = msgInfo.callback || null;
    }
    tipsAlert.close();
    tipsAlert.openToast({
      content: msg,
      closeCallback: callback
    });
  },
  openError: function (msgInfo) {
    console.log('openError', msgInfo)
    var msg = '';
    if (msgInfo && msgInfo.code) {
      // 登录信息异常
      //if (msgInfo.code == 401) {
      //  $nvwa.cookie.setCookie('m_token', '');
      //  this.undelegateEvents();
      //  router.navigate('login', {
      //    trigger: true,
      //    replace: true
      //  });
      //  return;
      //}
      msg = msgInfo.msg || msgInfo.message;
    }
    tipsAlert.close();
    tipsAlert.openAlert({
      content: msg
    });
  },
  openAlert: function (msgInfo) {
    var msg = ''
    if (msgInfo && msgInfo.code) {
      msg = msgInfo.msg;
    }
    tipsAlert.close();
    tipsAlert.openAlert({
      content: msg
    });
  },
});
Helper.registerTrigger();
export default Helper;
