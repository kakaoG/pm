/**
 *
 * 我的点评
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'

import Tpl from './comments.tpl'
import ReviewApi from  '../../api/review'
import UserApi from '../../api/user'
import MerchantApi from '../../api/merchant'
import ListView from '../../element/view/list-view'
import CommentItemView from '../../element/view/comment-item'
import InputBox from '../../element/view/input-box'
import Header from '../../element/view/header'
import LabelImageBox from '../../element/view/label-image-box'
import StarBox from '../../element/view/star-box'
import HxView from '../../components/hx-view'
import api from '../../api/api'
import ErrorView from './../view/error'

import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event)
let DelModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.review.deleteReview)
});
let MyCommentModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.user.commentList),
  getRoot(){
    return this.toJSON() || {};
  },
  getCurrentRecords(){
    return this.getRoot().data;
  }
});
let MerchantCommentModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.review.list),
  getRoot(){
    return this.toJSON() || {};
  },
  getCurrentRecords(){
    return this.getRoot().data;
  }
});
let GuideCommentModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.review.list),
  getRoot(){
    return this.toJSON() || {};
  },
  getCurrentRecords(){
    return this.getRoot().data;
  }
});
var LayoutView = Backbone.View.extend({
  className: 'comments-view',
  events: {
    "click .btn-more": "more"
  },
  destroy: function () {
    var t = this;
    t.reviewListView.destroy();
    t.remove();
  },
  more: function () {
    var t = this;
    if (t.flag) {
      t.flag = false;
      t.page++;
      t.fetch();
    }
  },
  flag: true,
  initialize: function (options, config) {
    var t = this;
    var title = '';
    t.type = config.type;
    t.id = config.id;
    if (t.type == 1) {
      title = '我的点评';
      t.model = new MyCommentModel();
    } else if (t.type == 2) {
      title = '店铺点评';
      t.model = new MerchantCommentModel();
    } else if (t.type == 3) {
      title = '商场点评';
      t.model = new MerchantCommentModel();
    } else if (t.type == 4) {
      title = '商品点评';
      t.model = new MerchantCommentModel();
    } else if (t.type == 5) {
      title = '导购员评价';
      t.model = new GuideCommentModel();
    } else if(t.type==6){
      title = '文章点评';
      t.model = new MerchantCommentModel();
    }
    t.headerView = new Header({}, {
      title: title
    });
    $('.header').html(t.headerView.render().el);
    t.page = 1;
    t.pageSize = 30;
    t.model.set({
      page: 1,
      pageSize: 30
    })
    let VErrorView = ErrorView.extend({
      isModule: true
    })
    t.errorView = new VErrorView();
    t.reviewListView = new ListView();
    let VCommentItemView = null;
    if (t.type == 1) {
      VCommentItemView = CommentItemView.extend({
        showReply: true,
        showTarget: true,
        readonly: false,
        hasAction: true
      });
    } else {
      VCommentItemView = CommentItemView.extend({
        showReply: true,
        showTarget: true,
        readonly: false,
        hasAction: true
      });
    }
    t.reviewListView.setChildView(VCommentItemView);
    t.listenTo(t.reviewListView, 'comment-item:content:click', function (id) {
      router.navigate('comment/' + id, {
        trigger: true
      })
    });
    t.listenTo(t.reviewListView, 'comment-item:action:del:click', function (id) {
      let model = new DelModel();
      model.set('id', id);
      model.destroy({
        success: function () {
          eventChannel.request(consts.radio.event_dialog_toast, {
            code: '',
            msg: '删除成功',
            callback: function () {
              history.back();
            }
          });
        }
      });
    });
    t.listenTo(t.model, 'change', t.setDatas);
  },
  setDatas(model){
    let t = this;
    t.flag = true;
    let data = model.getRoot();
    if(data.totalPage == 0) {
      t.$('.contents').hide();
      t.$('.error').show();
    } else if (data.totalPage == t.page) {
      if(t.page == 1) {
        t.$el.find(".btn").remove();
      } else {
        t.$el.find(".btn").attr('disabled', true).text("已经到底部");
      }
    } else {
      t.$el.find(".btn").attr('disabled', false).text("更多");
    }
    let currentRecords = model.getCurrentRecords();
    if (t.type == 1) {
      _.each(currentRecords, function (item) {
        item.auth = true;
      });
    }
    t.reviewListView.addAll(currentRecords);
    nprogress.done();
    eventChannel.request(consts.radio.event_rebuild_image_path);
  },
  fetch(){
    let t = this;
    let type = '';
    if (t.type == 1) {
      // '我的点评';
      type = 'my';
    } else if (t.type == 2) {
      // '店铺点评';
      type = 'merchant';
    } else if (t.type == 3) {
      // '商场点评';
      type = 'market';
    } else if (t.type == 4) {
      // '商品点评';
      type = 'product';
    } else if (t.type == 5) {
      // '导购员点评';
      type = 'comment_guid';
    } else if (t.type ==6 ) {
      type = 'market_atical';
    }
    t.model.fetch({
      method: 'post',
      data: ({
        page: t.page,
        pageSize: t.pageSize,
        id: t.id,
        type: type
      })
    });
  },
  //
  render: function () {
    var t = this;
    t.$el.html(tpl(Tpl()));
    t.$('.error').html(t.errorView.render().el);
    t.$el.find(".btn").attr('disabled', true).text("Loading...");
    t.$('.remark-main').append(t.reviewListView.render().el);
    return t;
  },

});
export default LayoutView;
