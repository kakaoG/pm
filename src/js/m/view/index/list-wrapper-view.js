/**
 * Created by HX on 2016/7/29.
 */
/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import ListWrapperViewTpl from '../../template/index/list-wrapper-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import Helper from '../../../core/view-helper'
import consts from '../../../util/consts'

let Model = Backbone.Model.extend({});

var eventChannel = Backbone.Radio.channel(consts.radio.event);

const LayoutView = Helper.createView({
  className: 'list-wrapper',
  template: ListWrapperViewTpl(),
  events: {
    'click .more': 'moreClick'
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  moreClick(){
    let slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      title: '更多商品',
      content: '请到APP中查看',
      btnText: '立即下载'
    });
    this.listenTo(slideContainerDefaultItemView, 'btn:click', this.download);
    this.slideContainerView = eventChannel.request(consts.radio.event_dialog,
      slideContainerDefaultItemView);
  },
  setChildView: function (View) {
    this.childView = View;
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    var data = t.model.toJSON()||{};
    t.$el.html(tpl(t.template,{
      data: data
    }));
    t.$(".list-view-wrapper").html(t.childView.render().el);
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy(){
    let t = this;
    if(t.slideContainerView) {
      t.slideContainerView.trigger('destroy');
    }
    t.remove();
  }
});

export default LayoutView;