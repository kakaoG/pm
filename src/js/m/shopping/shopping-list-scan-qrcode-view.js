import Backbone from 'backbone'

import Tpl from './shopping-list-scan-qrcode-view.tpl'


const LayoutView = Backbone.View.extend({
  className: 'shopping-list-scan-qrcode-view',
  template: Tpl(),
  events: {
    'click .content img': 'imgClick'
  },
  imgClick(){
    this.trigger('item:image:click');
  },
  initialize(){
    var t = this;
    t.listenTo(t, 'destroy', t.remove);
  },
  render(){
    let t = this;
    t.$el.html(t.template);
    return t;
  }
});

export default LayoutView;