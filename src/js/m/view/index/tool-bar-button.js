import Backbone from 'backbone';
import Tpl from '../../template/index/tool-bar-button-view.tpl';


const View = Backbone.View.extend({
  className: 'tool-bar-button-view',
  template: Tpl(),
  events: {
    'click .tab-shouqi': 'tabShouqiClick',
    'webkitAnimationEnd .tab-xie': 'tabXieWebkitAnimationEnd'
  },
  expend: false,
  tabXieWebkitAnimationEnd(){
    let t = this;
    if(t.expend) {
      t.tabXie.toggleClass('tab-xie-hide');
      t.tabTel.toggleClass('tab-tel-hide');
      t.tabTel.hide();
      t.tabXie.hide();
      t.expend = false;
    } else {
      t.expend = true;
    }
  },
  tabShouqiClick(){
    let t = this;
    if (!t.expend) {
      t.tabXie.show();
      t.tabTel.show();
    } else {
      t.tabXie.toggleClass('tab-xie-hide');
      t.tabTel.toggleClass('tab-tel-hide');
    }
    t.tabXie.toggleClass('tab-xie-show');
    t.tabTel.toggleClass('tab-tel-show');
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template));
    t.tabXie = t.$('.tab-xie');
    t.tabTel = t.$('.tab-tel');
    return t;
  }
});

export default View;