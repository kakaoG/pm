/**
 *
 * 我的收藏
 **/
import Backbone from 'backbone'
import Tpl from './product.tpl'
import StarBox from '../../element/view/star-box'
import Header from '../../element/view/header'
import api from '../../api/api'
import nprogress from 'nprogress'

import SlideView from '../../element/view/slide-view'
import ListView from '../../element/view/list-view'
import CommentWrapperView from '../view/index/comment-wrapper-view'
import CommentItemView from '../../element/view/comment-item'
import ProductActionView from './product-action-view'
//import ProductBannerView from './product-banner-view'
import ProductBaseInfoView from './product-base-info-view'
import ProductDetailView from './product-detail-view'
import ProductEvaluateAllView from './product-evaluate-all-view'
import ProductEvaluateView from './product-evaluate-view'
import ProductIntroductionView from './product-introduction-view'
import ProductParamView from './product-param-view'
import ProductServiceView from './product-service-view'
import ProductStoreAddressView from './product-store-address-view'
import ProductSuggestView from './product-suggest-view'
import TabsView from '../../element/tabs/tabs-view'
import SiteCatalog from '../../util/SiteCatalog'

import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

var LayoutModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.product.detail),
  getRoot(){
    return this.toJSON() || {};
  },
  getProductInfo: function () {
    let productInfo = this.getRoot().productInfo || {};
    let promotionInfo = this.getRoot().promotionInfo || {};
    if(promotionInfo.promotion == null || promotionInfo.promotion == undefined) {
      promotionInfo.promotion = 0;
    }
    productInfo.accountPrice = productInfo.salePrice - promotionInfo.promotion;
    productInfo.stock = promotionInfo.stock;
    let flag = parseInt(this.getRoot().inCart) || 0;
    flag = flag>0?true:false;
    //true 已加入 false 未加入
    productInfo.isAdd = flag;

    return this.getRoot().productInfo || {};
  },
  getCommentListViewData(){
    let reviewList = this.getRoot().reviewList || [];
    for(var i=0; i<reviewList.length; i++){
      reviewList[i]._site_ = {
        page: '110.101.20.40.11.010.30',
        p_action_id: reviewList[i].id,
        p_action_total: reviewList.length,
        p_action_pos: i+1
      }
    }

    return reviewList;
  },
  //体验店地址
  getShopInfoBrief(){
    return this.getProductInfo().shopInfoBrief || {};
  }
});
var LayoutView = Backbone.View.extend({
  className: 'product-view',
  template: Tpl(),
  initTabsView(){
    let t = this;
    let tabsViewDatas = [];
    tabsViewDatas.push({
      label: '详情',
      value: 1,
      _site_: {
        page: '110.101.20.40.11.010.10',
        p_id: t.id,
        p_action_id: 1,
        p_action_pos: 1
      }
    });
    tabsViewDatas.push({
      label: '参数',
      value: 2,
      _site_: {
        page: '110.101.20.40.11.010.10',
        p_id: t.id,
        p_action_id: 2,
        p_action_pos: 2
      }
    });
    tabsViewDatas.push({
      label: '服务',
      value: 3,
      _site_: {
        page: '110.101.20.40.11.010.10',
        p_id: t.id,
        p_action_id: 3,
        p_action_pos: 3
      }
    });
    tabsViewDatas.push({
      label: '评价',
      value: 4,
      _site_: {
        page: '110.101.20.40.11.010.10',
        p_id: t.id,
        p_action_id: 4,
        p_action_pos: 4
      }
    });
    t.tabsView.setItems(tabsViewDatas);
    t.listenTo(t.tabsView, 'item:active', t.tabItemClick);
  },
  initialize: function (options, config) {
    let t = this;
    t.id = config.id;
    t.headerView = new Header({}, {
      title: '商品详情'
    });
    $('.header').html(t.headerView.render().el);

    //监听body滚动事件
    t.scrollModel = {};
    window.onscroll = function (e) {
      t.scrollModel.scrollTop = document.body.scrollTop;
      if (t.scrollModel.scrollTop >= parseInt(t.scrollModel.tabOffsetTop)) {
        t.$('.product-tabs').addClass('tab-fixed');
      } else {
        t.$('.product-tabs').removeClass('tab-fixed');
      }
    }

    t.productActionView = new ProductActionView();
    t.productBannerView = new SlideView();
    t.productBaseInfoView = new ProductBaseInfoView();
    t.productStoreAddressView = new ProductStoreAddressView();
    t.tabsView = new TabsView();
    t.productDetailView = new ProductDetailView();
    t.productEvaluateAllView = new ProductEvaluateAllView();
    t.productEvaluateView = new ProductEvaluateView();
    t.productIntroductionView = new ProductIntroductionView();
    t.productParamView = new ProductParamView();
    t.productServiceView = new ProductServiceView();
    //t.productSuggestView = new ProductSuggestView();
    let CommentListView = ListView.extend({});
    t.commentListView = new CommentListView();
    let VCommentItemView = CommentItemView.extend({
      showReply: true,
      showTarget: false,
      readonly: true,
    });
    t.commentListView.setChildView(VCommentItemView);
    t.commentListView.on('comment-item:content:click', function (id) {
      router.navigate('comment/' + id, {
        trigger: true
      });
    });
    let VCommentWrapperView = CommentWrapperView.extend({
      // 商品
      type: 4,
      title: '全部评价',
      hasAction: false,
    });
    t.commentWrapperView = new VCommentWrapperView();
    t.commentWrapperView.setChildView(t.commentListView);

    t.model = new LayoutModel({
      id: config.id
    });
    t.listenTo(t.model, 'change', t.setDatas);
  },
  tabItemClick(data){
    let t = this;
    switch (data.value) {
      case 1:
        $.scrollTo(t.$('.product-detail').position().top);
        break;
      case 2:
        $.scrollTo(t.$('.product-param').position().top);
        break;
      case 3:
        $.scrollTo(t.$('.product-service').position().top);
        break;
      case 4:
        $.scrollTo(t.$('.product-all-evaluate').position().top);
        break;
    }
  },
  refresh(){
    this.scrollModel.tabOffsetTop = this.$('.product-tabs').offset().top;
  },
  setDatas(){
    let t = this;
    let rootInfo = t.model.getRoot();
    let productInfo = t.model.getProductInfo();
    t.productActionView.setItems(productInfo);
    t.productBannerView.setItems(_.map(productInfo.imgs, function (item) {
      return {
        img: item
      }
    }));
    t.productBaseInfoView.setItems(_.extend({}, productInfo, {
      _site_: {

      }
    }));
    t.productDetailView.setItems(productInfo);
    t.productStoreAddressView.setItems(t.model.getShopInfoBrief());
    t.productEvaluateAllView.setItems(productInfo);
    t.productEvaluateView.setItems(productInfo);
    t.productIntroductionView.setItems(productInfo);
    t.productParamView.setItems(productInfo);
    t.productServiceView.setItems(productInfo);
    //t.productSuggestView.setItems(productInfo);

    let wrapDatas = {
      targetId: productInfo.pdtSku || '',
      totalElements: rootInfo.totalElemenets || 0,
      _site_: {
        page: '110.101.20.40.11.010.20',
        p_id: t.id
      }
    };

    t.commentWrapperView.setItems(wrapDatas);
    t.commentListView.addAll(t.model.getCommentListViewData());
    t.initTabsView();
    //render结束refresh
    t.refresh();
    t.headerView.setTitle(productInfo.pdtName);
    nprogress.done();
    eventChannel.request(consts.radio.event_after_fetch, {
      page: '110.101.20.00.00.000.10',
      p_id: t.id
    });
    eventChannel.request(consts.radio.event_proxy_link, t.$el);
  },
  render: function () {
    let t = this;
    t.$el.html(t.template);
    t.$('.product-banner').html(t.productBannerView.render().el);
    t.$('.product-base-info').html(t.productBaseInfoView.render().el);
    t.$('.product-introduction').html(t.productIntroductionView.render().el);
    t.$('.product-store-address').html(t.productStoreAddressView.render().el);
    t.$('.product-tabs').html(t.tabsView.render().el);
    t.$('.product-detail').html(t.productDetailView.render().el);
    t.$('.product-param').html(t.productParamView.render().el);
    t.$('.product-service').html(t.productServiceView.render().el);
    t.$('.product-evaluate').html(t.productEvaluateView.render().el);
    t.$('.product-all-evaluate').html(t.commentWrapperView.render().el);
    //t.$('.product-suggest').html(t.productSuggestView.render().el);
    t.$('.product-action').html(t.productActionView.render().el);
    return t;
  },
  fetch () {
    this.model.fetch();
  },
  destroy(){
    //移除body监听
    window.onscroll = null
  }
});
export default LayoutView;
