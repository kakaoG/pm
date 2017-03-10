/**
 * 图片显示组件
 **/
import Backbone from 'backbone'


import ImageViewTpl from '../template/image-view.tpl'
import ImageItemView from '../view/image-item-view'
import sdk from '../../util/sdk'
import browsers from '../../util/browsers'

var tplItem = '<li class="image-view-last-item"><#=item#></li>';
var ImageViewItemModel = Backbone.Model.extend({
  defaults: {
    imageUrl: ''
  }
});
var ImageViewCollection = Backbone.Collection.extend({
  model: ImageViewItemModel
});
var imageViewCollection = new ImageViewCollection();
var LayoutView = Backbone.View.extend({
  tagName: 'div',
  id: '_' + _.uniqueId(),
  previewImage: function (model) {
    if(!model) {
      return;
    }
    var currentUrl = model.toJSON().imageUrl;
    var urlList = _.map(imageViewCollection.toJSON(), function(model){
      return model.imageUrl;
    });
    if(!currentUrl || !urlList || _.isEmpty(urlList)) {
      return;
    }
    sdk.previewImage(currentUrl, urlList);
  },
  addOneView: function (item) {
    imageViewCollection.add({imageUrl: item});
  },
  addAll: function (urls) {
    var t = this;
    if(urls && _.isArray(urls)){
      _.each(urls, function (item) {
        t.addOneView(item);
      })
    }
  },
  clear: function () {
    imageViewCollection.remove(imageViewCollection.models);
  },
  //
  initialize: function (options, config) {
    var t = this;
    t.config = _.extend({
      lastItem: '', // 最后显示的元素
      max: 9,
      flag: true,
      urls: []
    }, config);
    t.listenTo(imageViewCollection, 'add', t.addImageView);
    //t.listenTo(imageViewCollection, 'remove', t._removeModel);
  },
  //_removeModel: function (model) {debugger
  //  model.destroy();
  //},
  addImageView: function (model) {
    var t = this;
    var imageItemView = new ImageItemView({
      id: '_' + _.uniqueId(),
      model: model});
    t.$('.image-view-last-item').before(imageItemView.render().el);
    t.listenTo(imageItemView, 'image-item-view:model:remove', this.removeImage);
    t.listenTo(imageItemView, 'image-item-view:model:removed', this.removedImage);
    t.listenTo(imageItemView, 'image-item-view:preview', this.previewImage);
    if(imageViewCollection.length >= 9) {
      t.$('.image-view-last-item').hide();
    }
  },
  removeImage: function (model) {
    imageViewCollection.remove(model);
  },
  removedImage: function (model) {
    var t = this;
    if (imageViewCollection.length < t.config.max) {
      t.$('.image-view-last-item').show();
    }
    t.trigger('image-view:collection:removed', model.toJSON());
  },
  render: function () {
    var t = this;
    t.$el.attr('id', t.id).html(tpl(ImageViewTpl(), {}));
    t.$('.list').append(tpl(tplItem, {item: t.config.lastItem}));
    t.addAll(t.config.urls);
    return t;
  },
  repaint: function (e) {

  },
  delImage: function () {
    var $this = $(this);
    $this.parents("li").addClass("hide");
  }
});
export default LayoutView;