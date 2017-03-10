import Backbone from 'backbone'
import browsers from '../../util/browsers'
import consts from '../../util/consts'
import DefaultItemView from './slide-container-default-item-view'

export default Backbone.View.extend({
  template: '<div class="view"></div>',
  className: 'slide-container',
  tagName: 'div',
  events: {
    // 防止滚动
    'touchmove': 'preventDefault',
    'click': 'selfClick',
    'click .view': 'viewClick'
  },
  selfClick(){
    this.destroy();
  },
  viewClick(e){
    e.stopPropagation();
  },
  preventDefault(e){
    e.preventDefault();
    e.stopPropagation();
  },
  initialize(options, config){
    let t = this;
    t.options = options;
    t.config = config;
    t.on('destroy', t.destroy);
  },
  show(childView, options){
    let t = this;
    // 销毁
    t.destroyChildView();
    if (!childView) {
      t.childView = new DefaultItemView(options);
    } else {
      t.childView = childView;
    }
    t.listenTo(t.childView, 'destroy', t.destroy);
    t.listenTo(t.childView, 'all', function (event, options){
      t.trigger(event, options);
    });
    t.$el.css('height', '100%').fadeIn();
    t.$('.view').html(t.childView.render().el);
    t.trigger('slide:shown', t.$el);
  },
  render(){
    let t = this;
    t.$el.html(t.template);
    if (!browsers.isWeixin()) {
      //t.$('.view').css('margin-top', consts.style.header_height);
    }
    return t;
  },
  hide(){
    let t = this;
    t.$el.hide();
  },
  destroyChildView(){
    let t = this;
    if (t.childView && t.childView.destroy) {
      t.childView.destroy();
    }
  },
  destroy() {
    let t = this;
    t.destroyChildView();
    t.remove();
    t.trigger('slide:hidden', t.$el);
  }
});