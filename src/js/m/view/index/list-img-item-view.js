import Backbone from 'backbone'

import Tpl from '../../template/index/list-img-item-view.tpl'


const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'img-item',
  template: Tpl(),

  initialize(){
    var t = this;
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let data = _.map(t.model.toJSON(), function (item) {
      return item;
    });
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