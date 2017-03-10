/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import BFViewTpl from '../../template/index/business-features-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'business-features-view',
  template: BFViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let datas = t.model.toJSON() || {};
    t.$el.html(tpl(t.template, {
      data: datas.data || []
    }));
    return t;
  },
  setItems (items){
    var t = this;
    t.model.set({
      _id: _.uniqueId(),
      data: items
    });
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;