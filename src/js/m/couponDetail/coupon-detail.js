/**
 *
 * 优惠券详情
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import Header from '../../element/view/header'
import CouponDetailTpl from  './coupon-detail.tpl'
import api from '../../api/api'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

var LayoutView = Backbone.View.extend({
  className: "coupon-detail",
  tpl: CouponDetailTpl(),
  initialize: function (option,config) {
    let t = this;
    t.id = config.id;
    t.headerView = new Header({}, {
      title: '优惠券详情'
    });
    $('.header').html(t.headerView.render().el);
    var Model = Backbone.Model.extend({
      url: api.getUrl(api.coupon.detail, api.coupon.contextPath) + '/' + t.id + '/2'
    });
    t.model = new Model();
    t.listenTo(t.model, 'change', t.render);
    t.on(t.model, t.destroy);
  },
  render: function () {
    let t = this;
    let data = t.model.toJSON();
    let rData = {};
    if(!_.isEmpty(data)){
      rData = {
        logo: '/img/m/index/mall_Mbig.jpg',
        name: data.ownerName,
        typeName: data.couponTypeName,
        title: data.title,
        startT: new Date(data.startT).format('yyyy.M.dd'),
        endT: new Date(data.endT).format('yyyy.M.dd'),
        range: data.useScope,
        option: data.conditions,
        desc: data.supplement,
        couponCode: data.couponCode,
        qrcodeUrl: api.getUrl(api.common.qrcode) + '/' + data.couponCode
      }
    }
    t.$el.html(tpl(t.tpl,{
      data: rData
    }));
    nprogress.done();
    eventChannel.request(consts.radio.event_rebuild_image_path);
    return t;
  },
  destroy(){
    let t = this;
    t.remove();
  },
  fetch: function () {
    let t = this;
    t.model.fetch();
  }
});

export default LayoutView;
