/**
 * 品牌推荐组件
 */

import Backbone from 'backbone'

import BrandInfoRecommendationListItemView from './brand-info-recommendation-image-list-item-view'
import Tpl from '../../template/mall/brand-info-recommendation.tpl'
import api from '../../../api/api'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import ListView from '../../../element/view/list-view'
import SelFloorView from '../../../element/select/selects-view'

let Model = Backbone.Model.extend({
  defaults: {
    brandListCount: 0
  }
});

const LayoutView = Backbone.View.extend({
  className: 'brand-info-recommendation-view',
  template: Tpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    //
    t.selFloorView = new SelFloorView();
    t.selCateView = new SelFloorView();
    t.listenTo(t.selFloorView, 'change:option:selected', t.selFloorViewChange);
    t.listenTo(t.selCateView, 'change:option:selected', t.selCateViewChange);
    t.brandListView = new ListView();
    t.brandListView.setChildView(BrandInfoRecommendationListItemView);
    t.brandCondition = {
      floorId: -1,
      categoryId: -1
    };
    t.listenTo(t.model, 'change', t.render);
  },
  // 更新品牌list
  fetchBrandList(){
    let t = this;
    let BrandModel = Backbone.Model.extend({
      urlRoot: api.getUrl(api.market.brand) + '/' + t.marketId + '/' + t.brandCondition.floorId,
      defaults:{
        id: -1
      },
      getRoot(){
        return this.toJSON() || {};
      }
    });
    let brandModel = new BrandModel();
    brandModel.set('id', t.brandCondition.categoryId);
    t.listenToOnce(brandModel, 'change', t.renderBrandList);
    brandModel.fetch();
  },
  // render
  renderBrandList(model){
    let data = model.toJSON();
    this.brandListView.setDatas(data.brandList || []);
    eventChannel.request(consts.radio.event_rebuild_image_path, this.$el);
  },
  selFloorViewChange(val){
    let t = this;
    t.brandCondition.floorId = val;
    t.fetchBrandList();
  },
  selCateViewChange(val){
    let t = this;
    t.brandCondition.categoryId = val;
    t.fetchBrandList();
  },
  setItems(model){
    let t = this;
    model = model || {};
    let logoList = model.logoList || [];
    t.model.set('brandListCount', logoList.length);
    let all = [{
      value: '-1',
      label: '全部'
    }];
    let floorList = _.map(model.floorList,function(item) {
      return {
          label: item.floorName,
          value: item.id
      }
    });
    let labelList = _.map(model.labelList,function(item) {
      return {
        label: item.categoryName,
        value: item.categoryId
      }
    });
    t.selFloorView.setItems(all.concat(floorList || []));
    t.selCateView.setItems(all.concat(labelList || []));
    t.brandListView.setDatas(logoList);
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
    }));
    t.$('.tab-content').html(t.brandListView.render().el);
    t.$('.select-floor').html(t.selFloorView.render().el);
    t.$('.select-cate').html(t.selCateView.render().el);
    return t;
  },
  destroy () {
    var t = this;
    t.remove()
  }
});

export default LayoutView;