import Backbone from 'backbone'

import guideInfoViewTpl from '../../template/guide/guide-info-view.tpl'
import StarBox from '../../../element/view/star-box'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'guide-info-view',
  template: guideInfoViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    let StarBoxModel = Backbone.Model.extend();
    t.starBoxModel = new StarBoxModel({
      score: 0
    });
    let VStarBox = StarBox.extend();
    t.guideScoreView = new VStarBox({
      model: t.starBoxModel
    });
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.model, 'change:guideScore', t.updateGuideScore);
  },
  updateGuideScore(model, shopScore){
    this.starBoxModel.set({
      score: shopScore
    })
  },
  render() {
    var t = this;
    var data = _.extend({
      guideGoodsList: []
    }, t.model.toJSON());
    if (!_.isEmpty(data)) {
      var arr = [];
      _.each(data.userLabelList, function (item) {
        arr.push(item.name);
      });
      data.tags = arr.join('、');
    }
    t.$el.html(tpl(t.template, {data: data}));
    t.updateGuideScore(t.model, data.score);
    t.$('.info-star').html(t.guideScoreView.render().el);

    return t
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  }
});

export default LayoutView;