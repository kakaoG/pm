/**
 * label Item 组件
 **/
import Backbone from 'backbone'

import Tpl from './label-item-view.tpl'

const LayoutView = Backbone.View.extend({
  className: 'label-item',
  tagName: 'li',
  template: Tpl(),
  initialize() {
    var t = this;
    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render() {
    var t = this;
    if (t.model) {
      let data = t.model.toJSON();
      // 格式，null=》0
      data.score = _.numberFormat(parseFloat(data.score || 0), 1, '', '');
      t.$el.html(tpl(Tpl(), {
        data: data
      }));
    }
    return t;
  },
  destroy () {
    this.remove()
  }
});
export default LayoutView;