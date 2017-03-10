import Backbone from 'backbone'

import CouponItemView from '../../template/coupons/list-coupon-item-view.tpl'
import Coupon from '../../../util/coupon'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import sdk from '../../../util/sdk'
import consts from '../../../util/consts'
import api from '../../../api/api'

const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'coupon-item',
  template: CouponItemView(),
  events:{
    'click .scan' : 'previewImage',
    'click .coupon': 'showDetailClick'
  },
  showDetailClick(){
    router.navigate('couponDetail/'+this.model.get('id'),{trigger: true})
  },
  previewImage(e){
    e.stopPropagation();
    let picUrl = api.getUrl(api.common.qrcode) + '/' + $(e.currentTarget).data('code');
    sdk.previewImage(picUrl,[picUrl]);
  },
  initialize(){
    var t = this;
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.model, 'remove', t.destroy);
  },
  render(){
    let t = this;
    let data = t.model.toJSON();
    if(data.status == 1) {
      data.status = "status0"
    } else {
      data.status = "status2"
    }
    let coupon = new Coupon(data);
    let tplData = _.extend({
        status: data.status
      }, coupon.getCouponData()
    );
    t.$el.html(tpl(t.template, {
      data: tplData
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {console.log('destroy');
    var t = this;
    if(this.slideContainerView) {
      this.slideContainerView.trigger(consts.eventBus.destroy);
    }
    t.remove();
  }
});

export default LayoutView;
