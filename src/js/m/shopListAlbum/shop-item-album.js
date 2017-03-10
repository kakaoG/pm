import Backbone from 'backbone'

import Tpl from './shop-item-album-view.tpl'


const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'shop-item-album-view',
  template: Tpl(),
  events:{
    'click img': 'imgClick'
  },
  imgClick(){
    this.trigger('img:click', this.model.toJSON());
  },
  initialize(){
    var t = this;
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
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