/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import AdsViewTpl from '../../template/index/band-introduce-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import consts from '../../../util/consts'

var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'band-introduce-view',
  template: AdsViewTpl(),
  events:{
    'click .show-detail': 'showDetailClick'
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  showDetailClick(){
    let slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      title: '更多品牌活动',
      content: '请到APP中查看',
      btnText: '立即下载'
    });
    this.listenTo(slideContainerDefaultItemView, 'btn:click', this.download);
    this.slideContainerView = eventChannel.request(consts.radio.event_dialog,
      slideContainerDefaultItemView);
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
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