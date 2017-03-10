/**
 * 品牌推荐组件
 */

import Backbone from 'backbone'

import MarketServiceViewTpl from '../../template/mall/market-service-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  tagName: 'dl',
  className: 'market-service-view',
  template: MarketServiceViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
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