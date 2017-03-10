/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import ShopNotifyViewTpl from '../../template/mall/shop-notify-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'shop-notify-view',
  template: ShopNotifyViewTpl(),
  events: {
    'click .notify-text': 'notifyTextClick'
  },
  notifyTextClick(){
    let t = this;
    if(!t.slideContainerDefaultItemView) {
      t.slideContainerDefaultItemView = new SlideContainerDefaultItemView({
        title: '公告',
        content: t.notifyText,
      });
    }
    t.slideContainerView = eventChannel.request(consts.radio.event_dialog, this.slideContainerDefaultItemView);
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let datas = t.model.toJSON() || {};
    if(datas.data && datas.data.length > 0) {
      t.notifyText = datas.data[0].text;
    }
    t.$el.html(tpl(t.template, {
      data: datas.data
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set({
      _id: _.uniqueId(),
      data: item
    });
  },
  destroy () {
    var t = this;
    if(t.slideContainerView) {
      t.slideContainerView.trigger('destroy');
    }
    t.remove()
  }
});

export default LayoutView;