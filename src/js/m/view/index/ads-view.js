/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import AdsViewTpl from '../../template/index/ads-view.tpl'

let Model = Backbone.Model.extend({
  link: '',
  img: '',
  text: ''
});

const LayoutView = Backbone.View.extend({
  className: 'ads',
  template: AdsViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.on('destroy', t.destroy);
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
    if(_.isEmpty(item)) {
      t.destroy();
    }
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;