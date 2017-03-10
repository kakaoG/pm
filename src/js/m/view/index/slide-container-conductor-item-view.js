import Backbone from 'backbone'
import Tpl from '../../template/index/slide-container-conductor-item-view.tpl'

export default Backbone.View.extend({
  className: 'slide-container-conductor-item',
  template: Tpl(),
  events: {
    'click button': 'btnOnClick',
    'click .icon-close': 'btnCloseOnClick'
  },
  btnOnClick(e){
    this.trigger('btn:click', e);
  },
  btnCloseOnClick(e){
    this.trigger('destroy');
  },
  initialize(options){
    let t = this;
    t.data = {
      src: options.src,
    };
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template, {
      data: t.data
    }));
    return t;
  }
});