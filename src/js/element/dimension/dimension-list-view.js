import Backbone from 'backbone'

import DimensionItemView from './dimension-item-view'

const View = Backbone.View.extend({
  tagName: 'ul',
  className: 'ul-writeComment',
  initialize(){
    let t = this;
    t.listenTo(t.collection, 'add', t.addView);
  },
  addView(model){
    let t = this;
    let dimensionItemView = new DimensionItemView({
      model: model
    });
    t.$el.append(dimensionItemView.render().el);
  },
  render(){
    return this;
  }
});

export default View;