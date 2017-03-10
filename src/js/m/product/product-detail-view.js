/**
 * 商品详情
 */
import Backbone from 'backbone'

import ProductDetailViewTpl from './product-detail-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'product-detail-view',
  template: ProductDetailViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let data = t.model.toJSON();
    t.$el.html(tpl(t.template, {
      data: data
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;