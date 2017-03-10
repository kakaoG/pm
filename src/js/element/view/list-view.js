/**
 * 列表组件
 * events:
 *    list-item-view:collection:add
 *    list-item-view:collection:remove
 *    list-item-view:collection:sort
 **/
import Backbone from 'backbone'
import Log from '../../util/Log'

var LayoutView = Backbone.View.extend({
  className: 'list-view',
  tagName: 'ul',
  setChildView: function (View) {
    this.childView = View;
  },
  initialize: function (options, config) {
    var t = this;
    // 数据接口不对外
    var Collection = Backbone.Collection.extend();
    t.collection = new Collection({});
    t.config = _.extend({}, config);
    t.listenTo(t.collection, 'add', t._addItemView);
    t.listenTo(t.collection, 'remove', t._removeModel);
    t.listenTo(t.collection, 'reset', t._resetView);
  },
  _removeModel: function (model, collection) {
    var t = this;
    //if (collection.length == 0) {
    //  t.remove();
    //  t.trigger('destroy');
    //}
  },
  addOneView: function (item) {
    var t = this;
    t.collection.add(item);
    t.trigger('render:one:after', item);
  },
  _resetView(collection, options){
    let t = this;
    Log.log('models', collection, 'prevCollection', options);
    // 移除旧的数据
    if(options.previousModels){
      _.each(options.previousModels, function (item) {
        item.unset('id');
        item.destroy();
      });
    }
    //添加新数据
    Log.log('添加新数据:', collection)
    _.each(collection.models, function (item) {
      t._addItemView(item);
    });
  },
  size(){
    return this.collection.size();
  },
  setDatas(list){
    this.collection.reset(list);
  },
  addAll(list) {
    var t = this;
    if (list && _.isArray(list)) {
      _.each(list, function (val) {
        // 修改数据库ID
        t.addOneView(val);
      })
    }
    t.trigger('render:all:after', list);
  },
  _addItemView: function (model) {
    var t = this;
    var listItemView = new t.childView({
      model: model
    });
    t.listenTo(model, 'all', function (event, model) {
      // 监控模型变化
      t.trigger('model:change', model);
      t.trigger(event, model);
      //eventChannel.request('guide-manual-view-get-coupon', model);
    });
    t.listenTo(listItemView, 'destroy', this._removeModel);
    t.listenTo(listItemView, 'all', this.listItemViewAllEvent);
    t.$el.append(listItemView.render().el);
  },
  _addItemView2: function (model) {
    var t = this;
    var listItemView = new t.childView({
      model: model
    });
    t.listenTo(model, 'all', function (event, model) {
      // 监控模型变化
      t.trigger('model:change', model);
      //eventChannel.request('guide-manual-view-get-coupon', model);
    });
    t.listenTo(listItemView, 'destroy', this._removeModel);
    t.listenTo(listItemView, 'all', this.listItemViewAllEvent);
    t.$el.append(listItemView.render().el);
  },
  listItemViewAllEvent(){
    this.trigger.apply(this, arguments);
  },
  render: function (collection) {
    var t = this;
    return t;
  },
  destroy: function () {
    var t = this;
    t.collection.remove(t.collection.models);
    t.remove();
  },
  empty(){
    var t = this;
    t.collection.remove(t.collection.models);
    //t.listenTo(t.collection, 'add', t._addItemView2);
  }
});
export default LayoutView;