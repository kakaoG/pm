/**
 * 评论显示组件
 */

import Backbone from 'backbone'

import ListWrapperViewTpl from '../../template/index/comment-wrapper-view.tpl'
import Helper from '../../../core/view-helper'

import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Helper.createView({
  className: 'list-wrapper',
  template: ListWrapperViewTpl(),
  title: '热门评价',
  hasAction: true,
  events: {
    'click .more': 'moreClick',
    'click .fr': 'frClick'
  },
  frClick(){
    let t = this;
    let id = t.model.get('data').targetId;
    let uri = '';
    if (t.type == 1) {
      uri = 'writeCommentMarket/' + id;
    }else if(t.type == 6){
      uri = 'writeCommentArticle/' + id;
    } else {
      uri = 'writeCommentMerchant/' + id;
    }
    eventChannel.request(consts.radio.event_navigate, uri, {
      role: true
    });
  },
  moreClick(){
    let t = this;
    let id = t.model.get('data').targetId;
    let uri = '';
    if (t.type == 1) {
      //商场
      uri = 'shoppingMallComments/' + id;
    } else if(t.type == 2) {
      // 店铺
      uri = 'merchantComments/' + id;
    } else if(t.type == 4) {
      // 商品
      uri = 'goodsComments/' + id;
    } else if(t.type == 6){
      uri = 'articleComments/' + id;
    }
    router.navigate(uri, {
      trigger: true
    });
  },
  setChildView: function (View) {
    this.childView = View;
  },
  initialize(options, config){
    var t = this;
    t.model = new Model();
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let data = t.model.toJSON().data || {};
    data.title = t.title;
    data.hasAction = t.hasAction;
    // data.totalElements = data.totalElemenets;
    t.$el.html(tpl(t.template, {
      data: data || {}
    }));
    t.$(".list-view-wrapper").html(t.childView.render().el);
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set({
      data: item
    });
  },
  destroy () {
    var t = this;
    if (t.childView) {
      t.childView.trigger('destroy');
    }
    t.remove()
  }
});

export default LayoutView;
