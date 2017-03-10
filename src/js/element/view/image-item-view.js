/**
 * 图片显示组件
 **/
import Backbone from 'backbone'
import ImageViewItemTpl from '../template/image-item-view.tpl'
const LayoutView = Backbone.View.extend({
  tagName: 'li',
  id: '_' + _.uniqueId(),
  events: {
    'click .del-icon': 'delImage',
    'click .image-item-view-img': 'previewImage',
  },
  previewImage: function () {
    var t = this;
    t.trigger('image-item-view:preview', t.model);
  },
  onWebkitAnimationEnd: function (e) {
    var t = e.data.context;
    t.remove();
    t.trigger('image-item-view:model:removed', t.model);
  },
  initialize: function () {
    var t = this;
    var modelObj = t.model.toJSON();
    t.config = _.extend({
      imageUrl: ''
    }, modelObj);
    t.listenTo(t.model, 'change:imageUrl', t.repaint);
    t.listenTo(t.model, 'destroy', function () {
      t.$el.addClass("hideImage");
    });
  },
  render: function () {
    var t = this;
    t.$el.on('webkitAnimationEnd', {context: t}, t.onWebkitAnimationEnd);
    t.$el.html(tpl(ImageViewItemTpl(), {data: t.config}));
    return t;
  },
  repaint: function (model, value, options) {
    var t = this;
    t.config = model.toJSON();
    t.render();
  },
  delImage: function () {
    var t = this;
    t.model.destroy();
    t.trigger('image-item-view:model:remove', t.model);
    //var $this = $(this);
    //$this.parents("li").addClass("hide");
  }
});
export default LayoutView;