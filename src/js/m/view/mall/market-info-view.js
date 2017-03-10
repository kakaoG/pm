/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import MarketInfoViewTpl from '../../template/mall/market-info-view.tpl'
import DynamicView from '../../../element/view/dynamic-view'
import StarBox from '../../../element/view/star-box'
import DimensionListview from '../index/dimension-list-view'
import api from '../../../api/api'
import Role from '../../../util/role'

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
  className: 'market-info-view',
  template: MarketInfoViewTpl(),
  events: {
    'click .like': 'likeClick',
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
    let followed = t.model.get('favorite');
    if(followed) {
      t.cancelModel.set({
        sourceId: t.model.get('mallId'),
        sourceType: '11'
      });
      t.cancelModel.fetch({
        method: 'delete',
        data: {
          sourceId: t.model.get('mallId')||1,
          sourceType: '11'
        },
        success: function (data) {
          t.model.set('favorite', !t.model.get('favorite'));
        }
      });
    } else {
      let followDataModel = new FollowDataModel();
      let data = t.model.toJSON();
      followDataModel.set({
        sourceId: data.mallId,
        sourceType: '11',
        title: data.title,
        picture: data.picture,
        channel: 'shop'
      });
      followDataModel.save({},{
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
        followText: '<i class="icon-icon iconfont" style="display: none"></i>收藏',
        followClass: ''
      });
    }
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.cancelModel = new CancelModel();
    let StarBoxModel = Backbone.Model.extend();
    t.starBoxModel = new StarBoxModel({
      score: 0
    });
    let VStarBox = StarBox.extend();
    t.shopScoreView = new VStarBox({
      model: t.starBoxModel
    });

    t.dimensionListview = new DimensionListview();
    let VFollowView = DynamicView.extend();
    t.followModel = new FollowModel();

    t.followView = new VFollowView({
      template: '<span class="like <#=followClass#>"><#=followText#></span>',
      model: t.followModel
    });

    t.listenTo(t, 'destroy', t.destroy);

    t.listenTo(t.model, 'change', t.render);
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
    t.$el.html(tpl(t.template, {
      data: data
    }));
    t.renderFavorite();
    t.updateShopScore(t.model, t.model.toJSON().visits);
    t.dimensionListview.setItems(data.shopDimensionScore);
    t.$('.star-wrapper').html(t.shopScoreView.render().el);
    t.$('.follow').html(t.followView.render().el);
    t.$('.label-list').html(t.dimensionListview.render().el);
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