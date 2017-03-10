/**
 * 带图片的label
 *
 **/
import Backbone from 'backbone'


import LabelImageBoxTpl from '../template/label-image-box.tpl'
var LayoutView = Backbone.View.extend({
  initialize: function (options, config) {
    var t = this;
    t.config = {
      text: '',
      afterText: '',
      imgClass: '',
      fieldName: ''
    };
    _.extend(t.config, config);
    t.render();
  },
  render: function () {
    var t = this;
    t.$el.html(tpl(LabelImageBoxTpl(), {
      data: t.config
    }));
  }
});
export default LayoutView;