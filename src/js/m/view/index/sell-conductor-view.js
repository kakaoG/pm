import Backbone from 'backbone'

import SlideContainerDefaultItemView from './slide-container-guide-item-view'
import SellConductorViewTpl from '../../template/index/sell-conductor-view.tpl'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'sell-conductor-view',
  template: SellConductorViewTpl(),
  events: {
    'click': 'sellConductorClick'
  },
  sellConductorClick(){
    let t = this;
    // 获取导购员数据
    let data = t.model.toJSON() || {};
    let guide = data.salesList || [];
    _.each(guide, function (item) {
      item.id = item.openId
    })
    let slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      guide: guide
    });
    this.listenTo(slideContainerDefaultItemView, 'btn:click', this.download);
    this.slideContainerView = eventChannel.request(consts.radio.event_dialog,
      slideContainerDefaultItemView);
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  initialize(){
    var t = this;
    t.model = new Model();

    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
    if(_.isEmpty(item)) {
      t.destroy();
    }
  },
  destroy () {
    var t = this;
    if(this.slideContainerView) {
      this.slideContainerView.trigger(consts.eventBus.destroy);
    }
    t.remove()
  }
});

export default LayoutView;