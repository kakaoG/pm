/**
 * label显示组件
 */

import Backbone from 'backbone'

import ListView from '../../../element/view/list-view'
import LabelItemView from '../../../element/labelList/label-item-view'
import Helper from '../../../core/view-helper'

let Model = Backbone.Model.extend({});

const LayoutView = Helper.createView({
  className: 'dimension-list-view',
  setChildView: function (View) {
    this.childView = View;
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.labelListView = new ListView();
    t.labelListView.setChildView(LabelItemView);

    t.on('destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    let t = this;
    let data = t.model.toJSON().data || [];
    t.labelListView.addAll(data);
    t.$el.html(t.labelListView.render().el);

    return t;
  },
  setItems (item){
    var t = this;
    t.model.set({
      data: item,
      _id: _.uniqueId()
    });
  },
  destroy(){
    let t = this;
    if(t.labelListView) {
      t.labelListView.trigger('destroy');
    }
    t.remove();
  }
});

export default LayoutView;
