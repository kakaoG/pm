/**
 *
 * 店铺首页
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'

import WriteComment from '../template/writeComment.tpl'
import ReviewAPI from  '../../api/review'
import AuthApi from  '../../api/auth'
import InputBox from '../../element/view/input-box'
import Header from '../../element/view/header'
import LabelImageBox from '../../element/view/label-image-box'
import StarBox from '../../element/view/star-box'
import TextAreaBox from '../../element/view/textarea-box'
import UploadBox from '../../element/view/upload-box'
import ImageView from '../../element/view/image-view'
import sdk from '../../util/sdk'
import browsers from '../../util/browsers'
import api from '../../api/api'
import DimensionListView from '../../element/dimension/dimension-list-view'
var uploadBox = new UploadBox();
import consts from '../../util/consts'
import config from '../../core/config'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let CommentModel = Backbone.Model.extend({
  url: api.getUrl(api.review.writeReview),
  defaults: {
    id: '',
    //market:商场
    //merchant:店铺
    type: '',
    detail: {},
    content: '',
    imgUrl: '',
  }
});

const LayoutView = Backbone.View.extend({
  events: {
    'click .writeComment .btn.btn-primary': 'submit',
    'change .writeComment .upload-btn input': 'upload',
    'click .writeComment .upload-btn-wx': 'camera'
  },
  camera: function (e) {
    var t = this;
    uploadBox.upload(function (fileList) {
      _.each(fileList, function (item, idx) {
        t.writeCommentImageView.addOneView(item.localId);
      });
    });
  },
  upload: function (e) {
    var t = this;
    let files = e.target.files;
    uploadBox.upload(function (fileList) {
      _.each(fileList, function (item) {
        t.writeCommentImageView.addOneView(item.localId);
      });
    }, files);
  },
  submit: function (e) {
    e.preventDefault();
    var t = this;
    eventChannel.request(consts.radio.event_dialog_loading);
    let labelsData = t.dimensionCollection.toJSON();
    let shop = {};
    _.each(labelsData, function (item) {
      shop[item.code] = item.score;
    });
    // 上传图片
    var files = uploadBox.getServerIds();
    if(files.length > config.reviews.image_upload_count) {
      eventChannel.request(consts.radio.event_dialog_toast, {
        msg: '评价的图片不能超过' + config.reviews.image_upload_count + '张,请删除多余图片.'
      })
      return;
    }
    var textAreaBox = t.comment_read_textarea.getValue();
    var success = function () {
      uploadBox.clear();
      eventChannel.request(consts.radio.event_dialog_toast, {
        code: '',
        msg: '点评成功',
        callback: function () {
          if (t.type == 2) {
            router.navigate('shopHome/' + t.id, {
              trigger: true
            });
          } else if(t.type == 6){
            router.navigate('article/' + t.id, {
              trigger: true
            });
          } else {
            router.navigate('mallHome/' + t.id, {
              trigger: true
            });
          }
        }
      });
    }
    if (_.isArray(files)) {
      files = files.join();
    }
    let commentModel = new CommentModel();
    let type = 'market';
    // 1:商场 2:店铺
    if (t.type == 2) {
      type = 'merchant';
    }else if(t.type == 6){
      type = 'market_atical';
    }
    commentModel.set({
      id: t.id,
      type: type,
      content: textAreaBox,
      imgUrl: files,
      detail: JSON.stringify(shop)
    });
    if(!labelsData.length){
      commentModel.set({
        detail: ''
      });
    }
    if(browsers.isWeixin()) {
      commentModel.set('reviewFrom', '1');
    }
    commentModel.save(null, {
      success: success
    });
  },
  initialize: function (options, config) {
    let t = this;
    t.id = config.id;
    t.type = config.type;
    t.headerView = new Header({}, {
      title: '写点评'
    });
    $('.header').html(t.headerView.render().el);
    // 清除缓存
    uploadBox.clear();
    // 设置长传按钮
    if (browsers.isWeixin()) {
      t.lastItem = '<div class="upload-btn-wx"><i class="iconfont icon-dianpingxiangji1"></i></div>';
    } else {
      t.lastItem = '<div class="upload-btn"><i class="iconfont icon-dianpingxiangji1"></i><input multiple type="file" accept=".jpg,.jpeg,.png"></div>';
    }
    let type = 'market';
    // 1:商场 2:店铺
    if (t.type == 2) {
      type = 'merchant';
    }else if(t.type == 6){
      type = 'market_atical';
    }
    let LabelModel = Backbone.Model.extend({
      url: api.getUrl(api.review.label) + '/' + type,
      getRoot(){
        return this.toJSON().data || {};
      },
      getLabels(){
        return this.getRoot() || [];
      }
    });
    // 维度Model
    t.labelModel = new LabelModel();
    let DimensionCollection = Backbone.Collection.extend();
    t.dimensionCollection = new DimensionCollection();
    t.dimensionListView = new DimensionListView({
        collection: t.dimensionCollection
      }
    );
    t.listenTo(t.labelModel, 'change', t.setDatas);
  },
  setDatas(){
    let t = this;
    t.dimensionCollection.add(t.labelModel.getLabels());
    nprogress.done();
  },
  fetch(){
    this.labelModel.fetch();
  },
  imageViewRemoved: function (removeObj) {
    uploadBox.remove(removeObj.imageUrl);
  },
  render: function () {
    var t = this;
    // 获取图片
    var files = uploadBox.getUploadFiles();
    t.writeCommentImageView = new ImageView({}, {
      urls: files,
      lastItem: t.lastItem
    });
    t.listenTo(t.writeCommentImageView, 'image-view:collection:removed', t.imageViewRemoved);
    t.$el.html(tpl(WriteComment(), {
      data: {
        images: files
      }
    }));
    t.$('.upload-images').html(t.writeCommentImageView.render().el);
    var StarBoxModel = Backbone.Model.extend({
      defaults: {
        score: 0
      }
    });
    t.comment_read_textarea = new TextAreaBox({
      el: t.$(".content-writeComment")
    }, {
      fieldName: 'comment',
      text: '500字',
      placeholder: '实物体验，逛店感受，商家服务态度......',
      maxlength: 500
    });
    t.$('.write-comment-labels').html(t.dimensionListView.render().el);
    return t;
  }
});
export default LayoutView;
