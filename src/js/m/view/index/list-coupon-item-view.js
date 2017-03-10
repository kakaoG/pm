import Backbone from 'backbone'

import CouponItemView from '../../template/index/list-coupon-item-view.tpl'
import api from '../../../api/api'
import Log from '../../../util/Log'
import consts from '../../../util/consts'

const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-coupon-item',
  template: CouponItemView(),
  events: {
    'click': 'actionOnClick'
  },
  actionOnClick(){
    let t = this;
    // 领券:2为已领用状态
    t.couponSaveModel.save(
      null, {
        success: function () {
          if (t.model.get('status') == 1) {
            t.model.set({
              status: 0
            })
          }
        },
        bizError(){}
      }
    )
  },
  couponSaveModelBizError(model){
    Log.info('model', model);
    this.model.set({
      status: 0,
      error: {
        code: model.code,
        message: model.message
      }
    })
  },
  initialize(){
    var t = this;
    let url = tpl(api.getUrl(api.coupon.channel, api.coupon.channel.contextPath), {
      channelId: 6,
      subChannelId: 6,
      cuponId: t.model.get('id'),
      channelName: 'm'
    });
    let CouponSaveModel = Backbone.Model.extend({
      url: url
    });
    t.couponSaveModel = new CouponSaveModel();
    t.listenTo(t.couponSaveModel, 'biz.err', t.couponSaveModelBizError);
    t.on(consts.eventBus.destroy, t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let data = t.model.toJSON();
    // 1:可以领取, 0：不可领取
    // 可用
    //if (data.status == 1) {
    //  data.actionText = '马上<br>领取';
    //  data.disabled = '';
    //} else if(data.status == 0) {
    //  data.actionText = '已经<br>领取';
    //  data.disabled = 'disabled';
    //}

    data.actionText = '马上<br>领取';

    t.$el.html(tpl(t.template, {
      data: data || {}
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.remove();
  }
});

export default LayoutView;