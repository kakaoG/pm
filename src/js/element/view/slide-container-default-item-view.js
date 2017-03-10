import Backbone from 'backbone'
import Tpl from '../template/slide-container-default-item-view.tpl'
export default Backbone.View.extend({
  className: 'slide-default-item',
  template: Tpl(),
  height: 0,
  width: 0,
  events: {
    'click button': 'btnClick',
    'click .link': 'linkClick',
    'click .icon-close': 'btnCloseOnClick'
  },
  btnClick(e){
    this.trigger('btn:click', e);
  },
  linkClick(e){
    this.trigger('link:click', e);
  },
  btnCloseOnClick(e){
    this.trigger('destroy');
  },
  initialize(options){
    let t = this;
    t.data = {
      title: options.title,
      content: options.content,
      btnText: options.btnText,
      linkText: options.linkText
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