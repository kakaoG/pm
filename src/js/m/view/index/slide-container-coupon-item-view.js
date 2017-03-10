import Backbone from 'backbone'

import ListView from '../../../element/view/list-view'
import ListCouponItemView from './list-coupon-item-view'
import Tpl from '../../template/index/slide-container-coupon-item-view.tpl'
import role from '../../../util/role'
import consts from '../../../util/consts'
import SlideContainerRegistItemView from '../../view/index/slide-container-regist-item-view'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import Log from '../../../util/Log'

export default Backbone.View.extend({
  className: 'slide-container-coupon-item',
  template: Tpl(),
  events: {
    // 防止滚动
    'touchmove': 'preventDefault',
    'click .icon-close': 'btnCloseOnClick'
  },
  btnCloseOnClick(e){
    this.trigger(consts.eventBus.destroy);
  },
  preventDefault(e){
    e.stopPropagation();
  },
  initialize(options){
    let t = this;
    t.couponListView = new ListView();
    t.couponListView.setChildView(ListCouponItemView);
    t.couponListView.addAll(options.coupons);
    t.on(consts.eventBus.destroy, t.destroy);
    let couponReceived = function (model) {
      // 判断领用状态
      if (model.status == 0) {
        t.trigger('coupon:received', model);
      }
    }
    t.listenTo(t.couponListView, 'change', function (model, options) {
      Log.log(model, options);
      // 需求变更,登录验证
      if (role.isLogin({role: true})) {
        couponReceived(model.toJSON());
      } else {
        //let slideContainerRegistItemView = new SlideContainerRegistItemView({
        //  callback: couponReceived,
        //  callbackParam: model.toJSON()
        //});
        //t.slideContainerView = eventChannel.request(consts.radio.event_dialog, slideContainerRegistItemView);
      }
    });
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template, {
      data: t.data
    }));
    t.$('.content').html(t.couponListView.render().el);
    return t;
  },
  destroy(){
    let t = this;
    if(t.slideContainerView) {
      t.slideContainerView.trigger(consts.eventBus.destroy);
    }
    t.remove();
  }
});
