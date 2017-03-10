/**
 * 金牌导购显示组件
 */

import Backbone from 'backbone'

import AdsViewTpl from '../../template/mall/sell-conductor-view.tpl'
import consts from '../../../util/consts'
import Log from '../../../util/Log'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'sell-conductor-view',
  template: AdsViewTpl(),
  events:{},
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let datas = t.model.toJSON() || {};
    t.$el.html(tpl(t.template, {
      data: datas.data
    }));
    return t;
  },
  setItems (item){
    var t = this;
    item._site_ = _.map(item,function(i){
     return{
       page: '110.200.01.41.02.010.30',
       p_action_id: i.id
     }
    });
    Log.log(item._site_);
    t.model.set({
      _id: _.uniqueId(),
      data: item
    });
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;