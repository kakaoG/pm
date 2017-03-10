/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import ProductActionViewTpl from './product-action-view.tpl'
import api from '../../api/api'

let Model = Backbone.Model.extend();

let GoodsAddModel = Backbone.Model.extend({
  url: api.getUrl(api.user.inventory.goods.add)
});
let GoodsDeleteModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.user.inventory.goods)
});
const LayoutView = Backbone.View.extend({
  className: 'product-action-view',
  template: ProductActionViewTpl(),
  events: {
    'click .btn': 'submit',
  },
  goodsDeleteModelDestroy(model){
    this.model.set('isAdd', false);
  },
  submit: function () {
    let t = this;
    if (!t.model.get('isAdd')) {
      t.goodsAddModel.set({
        from: '2',
        goodsSku: t.model.get('pdtSku')
      });
      t.goodsAddModel.unset('data');
      t.goodsAddModel.save(null, {
        success: function (data) {
          t.goodsDeleteModel.set('id', data.get('goodsSku'));
          t.model.set('isAdd', !t.model.get('isAdd'));
        },
      });
    } else {
      t.goodsDeleteModel.destroy();
    }
  },
  renderBtn: function () {
    let t = this;
    let data = t.model.toJSON();
    if(_.isEmpty(data)){
      t.$el.hide();
    }else {
      t.$el.show();
      if (!data.isAdd) {
        t.model.set({
          text: '<i class="icon-icon iconfont"></i>加入清单',
          eleClass: ''
        });
      } else {
        t.model.set({
          text: '从清单移除',
          eleClass: 'remove'
        });
      }
    }
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.goodsAddModel = new GoodsAddModel();
    t.goodsDeleteModel = new GoodsDeleteModel();
    t.listenTo(t.goodsDeleteModel, 'destroy', t.goodsDeleteModelDestroy);
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.model, 'change:remove', t.renderBtn);
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
    }));
    t.renderBtn();
    return t;
  },
  setItems (item){
    var t = this;
    item._site_ = {
      page: '110.101.20.80.01.010.50',
      p_id: item.pdtSku
    };
    t.model.set(item);
    t.goodsDeleteModel.set({
      id: item.pdtSku
    });
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;