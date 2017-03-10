/**
 * 品牌推荐图片显示组件
 */

import Backbone from 'backbone'
import config from '../../../core/config'

const LayoutView = Backbone.View.extend({
  className: 'brand-info-recommendation-image-list-item-view',
  tagName: 'li',
  initialize(){
    var t = this;
    t.listenTo(t.model, 'destroy', t.destroy);
  },
  render(){
    var t = this;
    let model = t.model.toJSON();
    let tag = $('<img>');
    tag.attr('src',model.brand_logo);
    t.$el.append(tag);
    return t;
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;