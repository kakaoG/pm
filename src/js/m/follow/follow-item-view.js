import Backbone from 'backbone'

import Tpl from './follow-item-view.tpl'

const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'follow-item-view',
  template: Tpl(),
  events: {
    'click .img,.info': 'itemClick'
  },
  itemClick(){
    this.trigger('item:click', this.model);
  },
  initialize(){
    var t = this;
    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let data = _.extend({
      class: [],
      tags: []
    }, t.model.toJSON());
    data.info = JSON.parse(data.desc1) || {};
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