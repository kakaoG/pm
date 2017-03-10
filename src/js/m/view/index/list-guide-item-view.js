import Backbone from 'backbone'

import GuideItemView from '../../template/index/list-guide-item-view.tpl'
import api from '../../../api/api'

const LayoutView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-guide-item',
  template: GuideItemView(),
  initialize(){
    var t = this;

    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let data = t.model.toJSON();
    t.$el.html(tpl(t.template, {
      data: data || {}
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.remove();
  }
});

export default LayoutView;