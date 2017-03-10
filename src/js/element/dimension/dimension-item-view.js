import Backbone from 'backbone'

import Tpl from './dimension-item-view.tpl'
import StarBox from '../view/star-box'


var StarBoxModel = Backbone.Model.extend({
  defaults: {
    score: 0
  }
});
const View = Backbone.View.extend({
  template: Tpl(),
  tagName: 'li',
  className: 'score score1',
  initialize(){
    let t = this;
    t.starBoxModel = new StarBoxModel();
    t.starBoxView = new StarBox({
      model: t.starBoxModel
    }, {
      modify: true
    });
    t.listenTo(t.starBoxModel, 'change:score', t.renderStarBoxView);
  },
  renderStarBoxView(model, score){
    score = score || 0;
    this.$('.i-score').html(_.numberFormat(score, 1, '', ''));
    this.model.set('score', score)
  },
  render(){
    let t = this;
    let modelData = t.model.toJSON();
    if (modelData.score == undefined) {
      t.model.set('score', 0);
    }
    modelData.score = _.numberFormat(modelData.score || 0, 1, '', '');
    t.$el.html(tpl(t.template, {
      data: modelData
    }));
    t.$('.sum-score').html(t.starBoxView.render().el);
    return t;
  },
  destroy(){
    let t = this;
    t.starBoxView.trigger('destroy');
    t.remove();
  }
});

export default View;