/**
 * 图片显示组件
 **/
import Backbone from 'backbone'


import ImageViewTpl from '../template/slide-view.tpl'
import browsers from '../../util/browsers'

import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({
  link: '#',
  img: '#',
  text: ''
});
let Collection = Backbone.Collection.extend({
  model: Model
});

const LayoutView = Backbone.View.extend({
  className: 'slideBox',
  template: ImageViewTpl(),
  initialize () {
    var t = this;
    t.collection = new Collection();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.collection, 'reset', t.render);
  },
  render() {
    var t = this;
    t.$el.html(tpl(ImageViewTpl(), {
      data: t.collection.toJSON()
    }));
    if(t.collection.length > 0) {
      t.$('.carousel').carousel();
      t.$('.carousel').hammer().on('swiperight', function () {
        $(this).carousel('prev');
      });
      t.$('.carousel').hammer().on('swipeleft', function () {
        $(this).carousel('next');
      });
    }
    return t;
  },
  setItems (items){
    var t = this;
    t.collection.reset(items);
    if(!items.length) {
      t.trigger('item:count', 0);
    } else {
      t.trigger('item:count', items.length);
    }
    eventChannel.request(consts.radio.event_rebuild_image_path);
  },
  destroy () {
    var t = this;
    t.collection.remove(t.collection.models);
    t.remove()
  }
});
export default LayoutView;