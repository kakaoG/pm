/**
 * 标星星
 **/
import Backbone from 'backbone'
import StarBoxTpl from '../template/star-box.tpl'
import HxView from '../../components/hx-view'


var StarModel = Backbone.Model.extend({
  defaults: {
    // 成绩
    score: 0,
    // 总星星数量
    count: 5,
  }
});
var LayoutView = HxView.extend({
  template: tpl(StarBoxTpl()),
  events: {},
  //
  initialize: function (options, config) {
    var t = this;
    if (!t.model) {
      t.model = new StarModel();
    } else {
      if (!t.model.get('count')) {
        t.model.set('count', 5);
      }
    }
    t.config = _.extend({
      modify: false
    }, config);
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.model, 'destroy', t.remove);
    if (t.model.get('score') == undefined) {
      t.model.set({
        score: t.config.score
      });
    }
    // 可修改模式
    if (t.config.modify) {
      t.starBoxId = '_' + _.uniqueId();
      t.events['click #' + t.starBoxId + ' .star'] = 'starOnClick';
      t.delegateEvents(t.events);
    }
  },
  starOnClick: function (e) {
    var t = this;
    var score = parseInt($(e.currentTarget).attr('idx')) + 1;
    t.model.set('score', score);
  },
  render: function () {
    var t = this;
    var score = t.model.get('score');
    var stars = parseInt(score);
    var halfStar = score - stars;
    halfStar = halfStar > 0 ? 0.5 : 0;
    var tplData = {
      _id: t.starBoxId,
      score: score,
      count: t.model.get('count'),
      brightStars: stars + halfStar,
    };
    t.$el.html(t.template({
      data: tplData
    }));
    return t;
  },
  getValue: function () {
    return this.model.get('score');
  },
  destroy: function () {
    var t = this;
    t.model.destroy();
  }
});
export default LayoutView;