import Backbone from 'backbone'

import nprogress from 'nprogress'
// View
import ErrorView from './view/error'
import ShopWaiting from './view/shopWaiting'
import SlideContainerRegistItemView from './view/index/slide-container-regist-item-view'
import PasswordView from './view/password'
import RegisterView from './view/register'
import CommentListView from './comment/comments'
import CommentDetailView from './comment/comment-detail'
import WriteCommentView from './view/writeComment'
import PersonalView from './view/personal'
import ProductView from './product/product'
import CouponsView from './view/coupons'
import CouponDetailView from './couponDetail/coupon-detail'
import ShareQRCodeView from './view/shareQRCode'
import FollowView from './follow/follow'
import ShoppingListView from './shopping/shopping-list'
import ShopAlbumListView from './shopListAlbum/shop-list-album.js'
//import TestView from './view/test'
import ShopHomeView from './view/shopHome'
import MallHomeView from './view/mallHome'
import DownloadView from './view/download'
import ShopGuideView from './view/shopGuide'
import ArticleView from './article/article'
import NavigateMapView from './view/navigate-map'
import ViewHelper from '../core/view-helper'
import role from '../util/role'

import consts from '../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
const Router = Backbone.Router.extend({
  routes: {
    //首页
    '': 'error',
    'index/:merchantId': 'index',
    'register': 'register',
    'register/:url': 'register',
    'login': 'login',
    'password': 'password',
    'follow': 'follow',
    'shoppingList': 'shoppingList',
    'shoppingList/:typeId': 'shoppingList',
    'coupons/:tabId': 'coupons',
    'navigateMap/:marketId/:floorId': 'navigateMap',
    'navigateMap/:marketId': 'navigateMap',
    'myConcern': 'myConcern',
    'product/:id': 'product',
    'forgotPassword': 'forgotPassword',
    'personal': 'personal',
    'myComments': 'myComments',
    'shopHome/:merchantId': 'shopHome',
    'mallHome/:mallId': 'mallHome',
    'shopGuide/:guideId':'shopGuide',
    'article/:articleId':'article',
    'commentList': 'commentList',
    'goodsComments/:id': 'goodsComments',
    'merchantComments/:id': 'merchantComments',
    'shoppingMallComments/:id': 'shoppingMallComments',
    'guideComments/:id': 'guideComments',
    'articleComments/:id':'articleComments',
    'comment/:id': 'commentDetail',
    'writeCommentMarket/:id': 'writeCommentMarket',
    'writeCommentMerchant/:id': 'writeCommentMerchant',
    'writeCommentArticle/:id': 'writeCommentArticle',
    'shareQRCode/:merchantId': 'shareQRCode',
    //'myCollect': 'myCollect',
    'error': 'error',
    'shopWaiting': 'shopWaiting',
    'shopAlbum/:id/:albumId': 'shopAlbum',
    'download': 'download',
    'couponDetail/:id': 'couponDetail'
    //'test': 'test'
  },
  render: function (View, config) {
    var t = this;
    // 需求变更,登录验证
    if (false && !role.isLogin(config)) {
      router.navigate('register/' + encodeURIComponent(location.href), {
        trigger: true,
        replace: true
      });
      return;
    }
    t.views = t.views || {};
    t.current = t.current || {};
    if (t.current.view) {
      t.current.view.trigger(consts.view_event.destroy);
      //根据ID移除View
      delete t.views[t.current.id];
    }
    if (t.views[config.viewId]) {
      t.views[config.viewId].view.trigger(consts.view_event.destroy);
      delete t.views[config.viewId];
    }
    var view = new View({}, _.extend({}, config));
    t.current = {
      id: config.viewId,
      view: view
    };
    t.views[config.viewId] = t.current;
    _.extend(view, ViewHelper);
    view.init.apply(view);
    // 画View
    nprogress.start();
    view.trigger('before:router');
    $('#container').html(view.render().el);
    if (view.fetch) {
      view.fetch();
    }
    eventChannel.request(consts.radio.event_proxy_link, view.$el);
    view.trigger('render:enter');
  },
  login: function () {
    var t = this;
    let slideContainerRegistItemView = new SlideContainerRegistItemView();
    return eventChannel.request(consts.radio.event_dialog, slideContainerRegistItemView);
  },
  password: function () {
    var t = this;
    t.render(PasswordView, {
      viewId: 'passwordView',
    });
  },
  product: function (id) {
    var t = this;
    t.render(ProductView, {
      viewId: 'productView',
      id: id
    });
  },
  follow: function () {
    var t = this;
    t.render(FollowView, {
      viewId: 'followView',
    });
  },
  couponDetail: function (couponId) {
    var t = this;
    t.render(CouponDetailView, {
      viewId: 'couponDetailView',
      id: couponId
    });
  },
  navigateMap: function (marketId,floorId) {
    var t = this;
    t.render(NavigateMapView, {
      viewId: 'navigateMapView',
      marketId: marketId,
      floorId: floorId
    });
  },
  register: function (url) {
    var t = this;
    t.render(RegisterView, {
      viewId: 'registerView',
      url: url
    });
  },
  // 评论详情
  commentDetail: function (id) {
    var t = this;
    t.render(CommentDetailView, {
      viewId: 'commentDetailView',
      id: id
    });
  },
// 我的评论列表
  myComments: function () {
    var t = this;
    t.render(CommentListView, {
      viewId: 'myCommentsView',
      role: true,
      type: 1
    });
  },
  // 店铺评论列表
  merchantComments: function (id) {
    var t = this;
    t.render(CommentListView, {
      viewId: 'merchantCommentsView',
      type: 2,
      id: id
    });
  },
  // 商场评论列表
  shoppingMallComments: function (id) {
    var t = this;
    t.render(CommentListView, {
      viewId: 'shoppingMallCommentsView',
      type: 3,
      id: id
    });
  },
  // 商品评论列表
  goodsComments: function (id) {
    var t = this;
    t.render(CommentListView, {
      viewId: 'goodsCommentsView',
      type: 4,
      id: id
    });
  },
  // 导购员评论列表
  guideComments: function (id) {
    var t = this;
    t.render(CommentListView, {
      viewId: 'guideCommentsView',
      type: 5,
      id: id
    });
  },
  // 文章评论列表
  articleComments: function (id) {
  var t = this;
  t.render(CommentListView, {
    viewId: 'articleCommentsView',
    type: 6,
    id: id
   });
  },
  personal: function () {
    var t = this;
    t.render(PersonalView, {
      viewId: 'personalView',
      role: true
    });
  },
  coupons: function (tabId) {
    var t = this;
    t.render(CouponsView, {
      viewId: 'couponsView',
      tabId :tabId,
      role: true
    });
  },
  shoppingList(typeId){
    var t = this;
    t.render(ShoppingListView, {
      viewId: 'shoppingListView',
      role: true,
      id: typeId
    });
  },
  writeCommentMarket: function (id) {
    var t = this;
    t.render(WriteCommentView, {
      viewId: 'writeCommentMarket',
      role: true,
      id: id,
      type: 1
    });
  },
  writeCommentMerchant: function (id) {
    var t = this;
    t.render(WriteCommentView, {
      viewId: 'writeCommentMerchant',
      role: true,
      id: id,
      type: 2
    });
  },
  writeCommentArticle: function (id) {
    var t = this;
    t.render(WriteCommentView, {
      viewId: 'writeCommentArticle',
      role: true,
      id: id,
      type:6
    });
  },
  shareQRCode: function (merchantId) {
    var t = this;
    t.render(ShareQRCodeView, {
      viewId: 'shareQRCodeView',
      merchantId: merchantId
    });
  },
  shopAlbum: function (id,albumId) {
    var t = this;
    t.render(ShopAlbumListView, {
      viewId: 'shopAlbumListView',
      id: id,
      albumId: albumId
    });
  },
  error: function () {
    var t = this;
    t.render(ErrorView, {
      viewId: 'errorView'
    });
  },
  shopWaiting: function () {
    var t = this;
    t.render(ShopWaiting, {
      viewId: ShopWaiting
    });
  },
  download: function () {
    var t = this;
    t.render(DownloadView, {
      viewId: 'downloadView'
    });
  },
  //test: function () {
  //  var t = this;
  //  t.render(TestView, {
  //    viewId: TestView
  //  });
  //},
  index: function (merchantId) {
    var t = this;
    t.render(IndexView, {
      viewId: 'index',
      merchantId: merchantId
    });
  },
  shopHome: function (merchantId) {
    var t = this;
    t.render(ShopHomeView, {
      viewId: 'shopHomeView',
      merchantId: merchantId
    });
  },
  mallHome: function (mallId) {
    var t = this;
    t.render(MallHomeView, {
      viewId: 'mallHomeView',
      mallId: mallId
    });
  },
  shopGuide: function (guideId) {
    var t = this;
    t.render(ShopGuideView, {
      viewId: 'shopGuideView',
      guideId: guideId
    });
  },
  article: function (articleId) {
    var t = this;
    t.render(ArticleView, {
      viewId: 'ArticleView',
      articleId: articleId
    });
  }
});
export default Router;
