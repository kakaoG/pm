import Backbone from 'backbone'

import ListView from '../../../element/view/list-view'
import ListGuideItemView from './list-guide-item-view'
import Tpl from '../../template/index/slide-container-guide-item-view.tpl'
import role from '../../../util/role'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

export default Backbone.View.extend({
  className: 'slide-container-guide-item',
  template: Tpl(),
  events: {
    'click .icon-close': 'btnCloseOnClick'
  },
  btnCloseOnClick(e){
    this.trigger('destroy');
  },
  preventDefault(e){
    e.stopPropagation();
  },
  initialize(options){
    let t = this;
    t.gudieListView = new ListView();
    t.gudieListView.setChildView(ListGuideItemView);
    t.gudieListView.addAll(options.guide);
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template, {
      data: t.data
    }));
    t.$('.content').html(t.gudieListView.render().el);
    return t;
  },
  destroy(){
    let t = this;
    if(t.slideContainerView) {
      t.slideContainerView.trigger('destroy');
    }
    t.remove();
  }
});