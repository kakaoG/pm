import Backbone from 'backbone'

import MarketViewTpl from '../../template/index/market-view.tpl'
import StarBox from '../../../element/view/star-box'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'market-view',
  template: MarketViewTpl(),
  events: {
    'click .header': 'headerClick'
  },
  headerClick(){
    router.navigate('mallHome/' + this.model.get('id'), {
      trigger: true
    });
  },
  initialize(){
    var t = this;
    t.model = new Model();
    let StarBoxModel = Backbone.Model.extend();
    t.starBoxModel = new StarBoxModel({
      score: 0
    });
    let VStarBox = StarBox.extend();
    t.shopScoreView = new VStarBox({
      model: t.starBoxModel
    });
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.model, 'change:shopScore', t.updateShopScore);
  },
  updateShopScore(model, shopScore){
    this.starBoxModel.set({
      score: shopScore
    })
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
    }));
    t.updateShopScore(t.model, t.model.toJSON().score);
    t.$('.score').html(t.shopScoreView.render().el);
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;