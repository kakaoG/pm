
import Backbone from 'backbone'

import ProductParamViewTpl from './product-param-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'product-param-view',
  template: ProductParamViewTpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  render(){
    var t = this;
    let data = _.extend({}, t.model.toJSON());
    // 等级
    //0：未设定；1：明码实价；2：明码议价
    switch(data.priceType) {
      case 0:
        data.priceTypeText = '未设定';
        break;
      case 1:
        data.priceTypeText = '明码实价';
        break;
      case 2:
        data.priceTypeText = '明码议价';
        break;
      default:
        data.priceTypeText = '未设定';
    }
    // 计价单位
    switch(data.chargeUnit) {
      case 2:
        data.chargeUnitText = '个';
        break;
      case 3:
        data.chargeUnitText = '个';
        break;
      default:
        data.chargeUnitText = '个';
    }
    t.$el.html(tpl(t.template, {
      data: data
    }));
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