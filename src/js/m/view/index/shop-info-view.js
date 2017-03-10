/**
 * 店铺信息组件
 */

import Backbone from 'backbone'

import ShopInfoView from '../../template/index/shop-info-view.tpl'
import DimensionListview from './dimension-list-view'
import StarBox from '../../../element/view/star-box'
import DynamicView from '../../../element/view/dynamic-view'
import api from '../../../api/api'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import Role from '../../../util/role'
var netCommunicationChannel = Backbone.Radio.channel(consts.radio.net_communication);

let Model = Backbone.Model.extend({});
let FollowModel = Backbone.Model.extend({
  url: api.getUrl(api.user.follow)
});
let FollowDataModel = Backbone.Model.extend({
  url: api.getUrl(api.user.follow)
});
let CancelModel = Backbone.Model.extend({
  url: api.getUrl(api.user.follow)
});
const LayoutView = Backbone.View.extend({
  className: 'shop-info',
  template: ShopInfoView(),
  events: {
    'click .like': 'likeClick',
    'click .personal': 'personalClick'
  },
  personalClick(){
    eventChannel.request(consts.radio.event_navigate, 'personal', {
      role: true,
    })
  },
  likeClick(){
    let t = this;
    //
    if (!Role.isLogin({role: true})) {
      router.navigate('register/' + encodeURIComponent(location.href), {
        trigger: true
      });
      return;
    }
    let type = 'add';
    let followed = t.model.get('favorite');
    if (followed) {
      // 取消收藏
      t.cancelModel.fetch({
        method: 'delete',
        data: {
          sourceId: t.model.get('merchantId'),
          sourceType: '13'
        },
        success: function (data) {
          t.model.set('favorite', !t.model.get('favorite'));
        }
      });
    } else {
      let followDataModel = new FollowDataModel();
      followDataModel.set({
        sourceId: t.model.get('merchantId'),
        sourceType: '13',
        channel: 'shop'
      });
      followDataModel.save({}, {
        success: function (data) {
          t.model.set('favorite', !t.model.get('favorite'));
        }
      })
    }
  },
  renderFavorite(){
    let t = this;

    let data = t.model.toJSON();
    if (data.favorite) {
      t.followModel.set({
        followText: '已收藏',
        followClass: 'disabled'
      });
    } else {
      t.followModel.set({
        followText: '收藏',
        followClass: ''
      });
    }
  },
  initialize(options, config){
    var t = this;
    t.model = new Model();

    t.dimensionListview = new DimensionListview();

    let StarBoxModel = Backbone.Model.extend();
    t.starBoxModel = new StarBoxModel({
      score: 0
    });
    let VStarBox = StarBox.extend();
    t.shopScoreView = new VStarBox({
      model: t.starBoxModel
    });
    let VFollowView = DynamicView.extend();
    t.followModel = new FollowModel();

    t.cancelModel = new CancelModel();

    t.followView = new VFollowView({
      template: '<span class="like <#=followClass#>"><#=followText#></span>',
      model: t.followModel
    });

    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change:stand', t.render);
    t.listenTo(t.model, 'change:favorite', t.renderFavorite);
    t.listenTo(t.model, 'change:shopScore', t.updateShopScore);
  },
  updateShopScore(model, shopScore){
    this.starBoxModel.set({
      score: shopScore
    })
  },
  render(){
    var t = this;
    var data = _.extend({
      shopDimensionScore: [],
      shopFeatures: [],
      stand: [],
      shopOperationClassification: []
    }, t.model.toJSON());
    if (data.storeImg) {
      data.background = '#';
    }
    t.$el.html(tpl(t.template, {
      data: data
    }));
    t.dimensionListview.setItems(data.shopDimensionScore);
    t.renderFavorite();
    t.updateShopScore(t.model, t.model.toJSON().score);
    t.$('.score').html(t.shopScoreView.render().el);
    t.$('.label-list').html(t.dimensionListview.render().el);
    t.$('.follow').html(t.followView.render().el);
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.shopScoreView.trigger('destroy');
    t.followView.trigger('destroy');
    t.remove()
  }
});

export default LayoutView;