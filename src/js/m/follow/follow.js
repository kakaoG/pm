/**
 *
 * 我的关注
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import Tpl from './follow.tpl'
import Header from '../../element/view/header'
import api from '../../api/api'
import FollowItemView from './follow-item-view'
import FollowListView from '../../element/view/list-view';

import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

var Model = Backbone.Model.extend({
  url: api.getUrl(api.user.collectList),
  getRoot(){
    let data = this.toJSON().data || [];
    let arr = [];
    _.each(data, function (item) {
      if(item.sourceType == 11 || item.sourceType == 13){
        arr.push(item);
      }
    });
    return arr;
  }
});
var LayoutView = Backbone.View.extend({
  className: 'follow-view',
  initialize: function (options, config) {
    let t = this;
    t.headerView = new Header({}, {
      title: '我的收藏'
    });
    $('.header').html(t.headerView.render().el);
    this.model = new Model();
    t.followListView = new FollowListView();
    t.followListView.setChildView(FollowItemView);
    t.listenTo(t.followListView, 'item:click', t.followDetail);
    this.listenTo(this.model, 'change', this.setDatas);
  },
  followDetail(model){
    let data = model.toJSON();
    if(data.type.code == 1){
      // 商场
      eventChannel.request(consts.radio.event_navigate, 'mallHome/' + data.type.code)
    } else {
      // 店铺
      eventChannel.request(consts.radio.event_navigate, 'shopHome/' + data.type.code)
    }
    console.log(event)
  },
  setDatas(model){
    this.followListView.addAll(this.model.getRoot());
    nprogress.done();
    eventChannel.request(consts.radio.event_rebuild_image_path);
  },
  render: function () {
    let t = this;
    t.$el.html(Tpl());
    t.$('.follow-list').html(t.followListView.render().el);
    return t;
  },
  fetch: function () {
    this.model.fetch();
  }
});
export default LayoutView;