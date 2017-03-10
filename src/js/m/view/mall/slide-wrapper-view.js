/**
 * Created by HX on 2016/7/29.
 */
/**
 * 独特体验组件
 */

import Backbone from 'backbone'

import ListWrapperViewTpl from '../../template/mall/slide-wrapper-view.tpl'
import Helper from '../../../core/view-helper'
import consts from '../../../util/consts'

const LayoutView = Helper.createView({
  className: 'slide-wrapper',
  template: ListWrapperViewTpl(),
  setChildView: function (View) {
    let t = this;
    t.childView = View;
    if(t.childView) {
      t.listenTo(t.childView, 'item:count', t.childItemCount);
    }
  },
  initialize(){
    let t = this;
    t.on(consts.view_event.destroy, t.destroy);
  },
  childItemCount(count){
    if(count == 0) {
      this.trigger(consts.view_event.destroy);
    }
  },
  render(){
    var t = this;
    t.$el.html(t.template);
    t.$(".slide-view-wrapper").html(t.childView.render().el);
    return t;
  },
  destroy(){
    let t = this;
    if(t.childView) {
      t.childView.trigger(consts.view_event.destroy);
    }
    t.remove();
  }
});

export default LayoutView;