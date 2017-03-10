/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import BFViewTpl from '../../template/index/guide-manual-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import role from '../../../util/role'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import api from '../../../api/api'
import SlideContainerCouponItemView from './slide-container-coupon-item-view'
let Model = Backbone.Model.extend({});
let CouponModel = Backbone.Model.extend({
  url: api.getUrl('merchant_coupon')
})
import Log from '../../../util/Log'
const LayoutView = Backbone.View.extend({
  className: 'guide-manual-view',
  template: BFViewTpl(),
  type: 'merchant',
  events: {
    'click .coupon': 'couponClick',
    'click .shop-list': 'shopListClick',
    'click .merchant': 'conductorManualClick',
    'click .market': 'marketClick',
  },
  // 购物清单-导购手册
  conductorManualClick(){
    eventChannel.request(consts.radio.event_navigate, 'shoppingList/-2', {
      role: true,
    })
  },
  // 商场导览
  marketClick(){
    let t = this;
    let data = t.model.toJSON();
    eventChannel.request(consts.radio.event_navigate, 'navigateMap' + '/' +data.id + '/'+data.navigatemap.floorId, {
    })
  },
  shopListClick(){
    eventChannel.request(consts.radio.event_navigate, 'shoppingList', {
      role: true,
    })
  },
  showList(){
    //  跳转至优惠券列表页面
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  openCouponAppDialog(title, content, linkText){
    let t = this;
    // 配置领取成功页面
    t.slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      title: title,
      content: content,
      linkText: linkText,
      btnText: '下载APP回家看看'
    });
    t.listenTo(t.slideContainerDefaultItemView, {
      'link:click': t.showList,
      'btn:click': t.download
    });
    t.slideContainer2View = eventChannel.request(consts.radio.event_dialog, t.slideContainerDefaultItemView);
  },
  couponClick(){
    let t = this;
    // 获取优惠券数据
    let data = t.model.toJSON() || {};
    let coupon = data.coupon || {};
    if(_.isEmpty(coupon)||_.isEmpty(coupon.coupons)) {
      let title = '暂无优惠券';
      let content = '&nbsp;';
      let linkText = ' ';
      t.openCouponAppDialog(title, content, linkText);
      return;
    }
    // 配置优惠券画面
    t.slideContainerCouponItemView = new SlideContainerCouponItemView({
      coupons: coupon.coupons
    });
    t.listenTo(t.slideContainerCouponItemView, 'coupon:received', function (data) {
      let mobile = role.getPhoneNumber();
      let title = '领取成功';
      let content = '优惠券已放入此账号:<br>' + mobile;
      let linkText = '<a href="#coupons/1">立即查看</a>';
      // 业务异常
      if(data.error) {
        // PROMOTION_1013, 用户已领券
        if(data.error.code == 'PROMOTION_1013') {
          title = '已经领取';
        }
        if(data.error.code == 'PROMOTION_1015'){
          title = '抱歉！还没到领取时间';
          mobile = '';
          linkText = '';
          content = new Date(data.expiryDate.from).format('yyyy.MM.dd')+'-'+new Date(data.expiryDate.to).format('yyyy.MM.dd');
        }
      }
      t.openCouponAppDialog(title, content, linkText);
      t.trigger('coupon:status', data);
      //// 配置领取成功页面
      //t.slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      //  title: title,
      //  content: content,
      //  linkText: linkText,
      //  btnText: '下载APP回家看看'
      //});
      //t.listenTo(t.slideContainerDefaultItemView, {
      //  'link:click': t.showList,
      //  'btn:click': t.download
      //});
      //t.slideContainer2View = eventChannel.request(consts.radio.event_dialog, t.slideContainerDefaultItemView);
    });
    // 显示优惠券画面
    t.slideContainer1View = eventChannel.request(consts.radio.event_dialog, t.slideContainerCouponItemView);
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let data = t.model.toJSON();
    data.type = t.type;
    t.$el.html(tpl(t.template, {
      data: data
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    if(t.slideContainer1View) {
      t.slideContainer1View.trigger('destroy');
    }
    if(t.slideContainer2View) {
      t.slideContainer2View.trigger('destroy');
    }
    t.slideContainerCouponItemView && t.slideContainerCouponItemView.trigger('destroy');
    t.slideContainerDefaultItemView && t.slideContainerDefaultItemView.trigger('destroy');
    t.remove();
  }
});

export default LayoutView;