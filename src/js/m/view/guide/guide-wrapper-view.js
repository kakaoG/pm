/**
 * 评论显示组件
 */

import Backbone from 'backbone'

import ListWrapperViewTpl from '../../template/guide/guide-wrapper-view.tpl'
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
    uri = 'guideComments/' + id;
    eventChannel.request(consts.radio.event_navigate, uri, {
      role: true
    });
  },
  moreClick(){
    let t = this;
    let id = t.model.get('data').targetId;
    let uri = 'guideComments/' + id;
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
    var data = _.extend({
      labelList: []
    }, t.model.toJSON().data);
    console.log(t.model.toJSON());
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