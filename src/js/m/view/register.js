/**
 *
 * 首页->注册
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import Header from '../../element/view/header'
import Register from  '../view/index/slide-container-regist-item-view'
import Router from '../router'
import Log from '../../util/Log'
import SiteCatalog from '../../util/SiteCatalog'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

var LayoutView = Backbone.View.extend({
  className: "register",
  backClick(){
    this.forward();
  },
  forward(){
    location.replace(this.url);
  },
  initialize: function (options, config) {
    var t = this;
    t.siteCatalog = new SiteCatalog();console.log(config.url)
    t.url = decodeURIComponent(config.url) || '';
    t.headerView = new Header({}, {
      useDefault: false,
      title: '注册'
    });
    $('.header').html(t.headerView.render().el);
    t.listenToOnce(t.headerView, 'back:click', t.backClick);
    t.register = new Register();
    t.listenTo(t.register, 'register:success', function () {
      if (t.url != "undefined") {
        if (/http[s]?:\/\//.test(t.url)) {
          location.replace(t.url);
        } else {
          router.navigate(t.url, {trigger: true, replace: true});
        }
      } else {
        history.back();
      }
    });
    t.on(consts.view_event.destroy, t.destroy);
  },
  render: function () {
    var t = this;
    t.$el.html(t.register.render().el);
    nprogress.done();
    eventChannel.request(consts.radio.event_after_fetch, {
      page: '110.600.02.00.00.000.19'
    });
    return t;
  },
  destroy(){
    let t = this;
    if (t.register) {
      t.register.trigger('destroy');
    }
    t.remove();
  }

});

export default LayoutView;