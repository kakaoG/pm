import Backbone from 'backbone'

import Tpl from './shopping-list-item-view.tpl'


const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'shopping-list-item-view',
  template: Tpl(),
  events: {
    'click .img': 'imgClick'
  },
  imgClick(){
    this.trigger('item:image:click', this.model.toJSON());
  },
  initialize(){
    var t = this;
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let modelData = t.model.toJSON();
    let data = _.extend({
      title: modelData.objectName,
      count: modelData.numbers,
      img: modelData.pic
    });
    t.$el.html(tpl(t.template, {
      data: data
    }));
    return t;
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;