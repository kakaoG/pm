/**
 *
 * 下载
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import Header from '../../element/view/header'
import api from '../../api/api'
import DownloadTpl from '../template/download.tpl'
import consts from '../../util/consts'
import browser from '../../util/browsers'
import SiteCatalog from '../../util/SiteCatalog'
import config from '../../core/config'

var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({
});

const LayoutView = Backbone.View.extend({
  className: 'download-app',
  tpl: DownloadTpl(),
  events: {
    'click .mask': 'hide',
    'click .ios': 'iosDownload',
    'click .android': 'androidDownload',
  },
  hide: function (e) {
    this.$('.mask').fadeOut();
  },
  iosDownload: function () {
    location.assign(config.download.ios);
  },
  androidDownload: function () {
    location.assign(config.download.android);
  },
  initialize: function () {
    let t = this;
    let flag = browser.isWeixin();
    t.model = new Model({
      flag: flag
    });
    t.headerView = new Header({}, {
      title: '下载APP'
    });
    $('.header').html(t.headerView.render().el);
  },
  render: function () {
    let t = this;
    let data = t.model.toJSON();
    t.$el.html(tpl(t.tpl,{
      data: data
    }));
    eventChannel.request(consts.radio.event_enter_router);
    eventChannel.request(consts.radio.event_proxy_link, t.$el);
    let siteCatalog = new SiteCatalog();
    siteCatalog.pageAndUserView({
      page: '110.600.04.00.00.000.10'
    });
    return t;
  }
});
export default LayoutView;