/**
 *
 * 点评详情
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'

import Tpl from './comment-detail.tpl'
import CommentItemView from '../../element/view/comment-item'
import Header from '../../element/view/header'
import api from '../../api/api'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event)
let Model = Backbone.Model.extend({
  urlRoot: api.getUrl(api.review.detailReview),
  getRoot(){
    return this.toJSON().data || [];
  },
  getReviewDetail(){
    let data = {};
    let root = this.getRoot();
    if(root.length > 0) {
      data = root[0];
    }
    return data;
  }
});
let DeleteModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.review.deleteReview),
  getRoot(){
    return this.toJSON();
  }
});
var LayoutView = Backbone.View.extend({
  className: 'comment-detail-view',
  events: {},
  destroy: function () {
    var t = this;
    t.commentDetailView.destroy();
    t.remove();
  },
  more: function () {
    var t = this;
    if (t.flag) {
      t.loadData();
    }
  },
  flag: true,
  initialize: function (options, config) {
    var t = this;
    var title = '';
    t.id = config.id;
    t.headerView = new Header({}, {
      title: '点评详情'
    });
    $('.header').html(t.headerView.render().el);
    let VCommentItemView = CommentItemView.extend({
      showReply: true,
      showTarget: true,
      readonly: false,
      hasAction: true
    });
    t.model = new Model();
    t.model.set('id', t.id);
    let DetailModel = Backbone.Model.extend();
    t.detailModel = new DetailModel({
      id: t.id
    });
    t.commentDetailView = new VCommentItemView({
      model: t.detailModel
    });
    t.listenTo(t.commentDetailView, 'comment-item:action:del:click', function (event, id) {
      //删除点评
      let deleteModel = new DeleteModel();
      t.listenToOnce(deleteModel, 'destroy', t.modelDestroy);
      deleteModel.set('id', t.id);
      deleteModel.destroy();
    });
    t.listenTo(t.model, 'change', t.setDatas);
  },
  fetch(){
    this.model.fetch();
  },
  setDatas(model){
    this.detailModel.set(model.getReviewDetail());
    eventChannel.request(consts.radio.event_rebuild_image_path);
    nprogress.done();
  },
  //
  render: function () {
    var t = this;
    t.$el.html(tpl(Tpl()));
    t.$('.detail').append(t.commentDetailView.render().el);
    return t;
  },
  modelDestroy(){
    eventChannel.request(consts.radio.event_dialog_toast, {
      code: '',
      msg: '删除成功',
      callback: function () {
        history.back();
      }
    });
  }
});
export default LayoutView;