/**
 *
 * 优惠券
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import Tpl from '../template/coupons.tpl'
import Header from '../../element/view/header'
import ErrorTpl from '../template/error.tpl'
import ListView from '../../element/view/list-view'
import ListCouponItemView from './coupons/list-coupon-item-view'
import TabsView from '../../element/tabs/tabs-view'
import api from '../../api/api'
import {CouponStatus} from '../../util/coupon'
import consts from '../../util/consts'

//1 未使用 0 已失效 3 已取消（显示在已失效tab中） 4 已使用
var LayoutModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.coupon.me, api.coupon.me.contextPath),
  getRoot (){
    return this.toJSON() || {};
  },
  getCoupons(){
    return this.getRoot().list;
  },
  //未使用
  getNouesd(){
    let coupons = this.getCoupons();
    return _.filter(coupons, function (item) {
      return item.status == CouponStatus.unused;
    });
  },
  //已失效
  getUnused(){
    let coupons = this.getCoupons();
    return _.filter(coupons, function (item) {
      return item.status == CouponStatus.invalid;
    });
  },
  //已使用
  getUsed(){
    let coupons = this.getCoupons();
    return _.filter(coupons, function (item) {
      return item.status == CouponStatus.used;
    });
  },
});
var LayoutView = Backbone.View.extend({
  className: 'coupons-view',
  initialize: function (options, config) {
    let t = this;
    t.tabId = config.tabId;
    t.headerView = new Header({}, {
      title: '优惠券'
    });
    t.model = new LayoutModel();
    $('.header').html(t.headerView.render().el);

    t.couponsListView = new ListView();
    t.couponsListView.setChildView(ListCouponItemView);

    t.tabsView = new TabsView();
    t.listenTo(t.tabsView, 'item:active', t.tabItemClick);
    t.listenTo(t.model, 'change', this.setDatas);
  },
  tabItemClick(data){
    router.navigate('coupons/'+ data.code, {trigger: true, replace: true});
  },
  setDatas(model){
    let t = this;
    let index = 0;
    let listViewData = [];
    // 1 未使用 0 已失效 3 已取消（显示在已失效tab中） 4 已使用
    switch (t.tabId) {
      case CouponStatus.unused:
        index = 0;
        listViewData = t.model.getNouesd();
        break;
      case CouponStatus.invalid:
        index = 1;
        listViewData = t.model.getUnused();
        break;
      case CouponStatus.used:
        index = 2;
        listViewData = t.model.getUsed();
        break;
      default:
        index = 0;
        listViewData = t.model.getNouesd();
    }
    let tabsViewDatas = [{
      label: '未使用',
      code: CouponStatus.unused
    }, {
      label: '已失效',
      code: CouponStatus.invalid
    }, {
      label: '已使用',
      code: CouponStatus.used
    }];
    t.tabsView.setItems(tabsViewDatas, index);
    t.couponsListView.addAll(listViewData);
    t.renderCoupons();
    nprogress.done();
  },
  renderCoupons: function () {
    let t = this;
    if(t.couponsListView.size()>0){
      t.$('.coupons').html(t.couponsListView.render().el);
    } else {
      t.$('.coupons').html(ErrorTpl());
    }
  },
  render: function () {
    let t = this;
    t.$el.html(Tpl());
    t.$('.tabs').html(t.tabsView.render().el);
    return t;
  },
  fetch () {
    let t = this;
    this.model.fetch({
      url: this.model.url() + '?status=' + t.tabId
    });
  }
});
export default LayoutView;