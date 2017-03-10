/**
 * 列表元素组件
 * events:
 *    list-item-view:model:change
 *    list-item-view:model:change:[attribute]
 *    list-item-view:model:destroy
 **/

import Backbone from 'backbone'

var LayoutView = Backbone.View.extend({
  tagName: 'li',
  //setTemplate: function (template) {
  //  // 预编译模板
  //  t.template = tpl(template);
  //},
  //getTemplateData: function (model) {
  //  return this.model.toJSON();
  //},
  initialize: function (options, config) {
    var t = this;
    if (t.model) {
      t.listenTo(t.model, 'destroy', t.destroy);
      t.listenTo(t.model, 'change', t.change);
    }
  },
  change: function (model, options) {
    var t = this;
    // TODO: 需要添加change:attribute trigger.
    t.trigger('list-item-view:model:change', model);
  },
  //render: function () {
  //  var t = this;
  //  t.$el.html(t.template({
  //    data: tplData
  //  }));
  //  return t;
  //},
  destroy: function () {
    var t = this;
    t.destroy();
    t.trigger('list-item-view:model:destroy', t.model);
  }
});
export default LayoutView;