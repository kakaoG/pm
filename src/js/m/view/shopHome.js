/**
 *
 * 店铺首页
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'
import ShopHomeTpl from '../template/shopHome.tpl'
import ListView from '../../element/view/list-view'
import CommentItemView from '../../element/view/comment-item'
import InputBox from '../../element/view/input-box'
import HeaderView from '../../element/view/header'
import AuthApi from '../../api/auth'
import ReviewApi from '../../api/review'
import MerchantApi from '../../api/merchant'
import LabelImageBox from '../../element/view/label-image-box'
import StarBox from '../../element/view/star-box'
import HxView from '../../components/hx-view'
import UploadBox from '../../element/view/upload-box'
import storage from '../../util/storage'
import browsers from '../../util/browsers'
import SiteCatalog from '../../util/SiteCatalog'
import config from '../../core/config'

//import FooterView from './index/footer-view'
import SlideView from '../../element/view/slide-view'
import AdsView from './index/ads-view'
import SellConductorView from './index/sell-conductor-view'
import ListGoodsItemView from './index/list-img-item-view'
import ShopAlbumView from './index/shop-album-view'
import ShopInfoView from './index/shop-info-view'
import ListWrapperView from './index/list-wrapper-view'
import MarketView from './index/shopping-mall-view'
import SlideContainerView from '../../element/view/slide-container-view'
import BandIntroduceView from './index/band-introduce-view.js'
import SlideContainerDefaultItemView from '../../element/view/slide-container-default-item-view'
import consts from '../../util/consts'
import SlideContainerConductorItemView from './index/slide-container-conductor-item-view'
import BusinessFeaturesView from './index/business-features-view'
import GuideManualView from './index/guide-manual-view'
import SlideContainerCouponItemView from './index/slide-container-coupon-item-view'
import SlideContainerRegistItemView from './index/slide-container-regist-item-view'
import CommentWrapperView from './index/comment-wrapper-view'
import AppDownloadView from './index/app-download-view'
//import ToolBarButtonView from './index/tool-bar-button'
import AutoTooltip from './index/auto-tooltip'
import api from '../../api/api'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({
  urlRoot: api.getUrl(api.merchant.detail),
  getRoot(){
    return this.toJSON() || {};
  },
  getCouponViewData(){
    let dataList = this.getRoot().couponList || [];
    let dataObj = {
      coupons: []
    };
    _.each(dataList, function (res) {
      let item = {
        id: res.id,
        title: res.title,
        condition: res.conditions,
        couponType: res.couponType,
        couponTypeName: res.couponTypeName,
        status: res.status,
        expiryDate: {
          from: res.startT.replace(/-/g,'/'),
          to: res.endT.replace(/-/g,'/')
        }
      }
      dataObj.coupons.push(item);
    });
    return dataObj;
  },
  updateCouponStatus(id, status) {
    let couponList = this.get('couponList');
    let couponModel = _.find(couponList, function (item) {
      if(item.id == id) {
        item.status = status;
        return true;
      } else {
        return false;
      }
    });
    this.set({'couponList': couponList}, {silent: true});
    this.trigger('change:coupon', couponModel);
  },
  // 商场广告
  getShopActivitySlideViewData1(){
    let t =this;
    let advertList = this.getRoot().advertList || {};
    let retVal = _.map(advertList, function (item,idx) {
      return {
        link: item.linkUrl,
        img: item.imgUrl,
        _site_: {
          p_id: t.id,
          page: '110.250.20.40.02.010.20',
          p_action_total: advertList.length,
          p_action_pos: idx,
          p_action_id: item.id
        }
      }
    });
    return retVal;
  },
  // 店铺广告位
  getShopActivitySlideViewData2(){
    let t = this;
    let activityList = this.getRoot().activityList || [];
    let retVal = _.map(activityList, function (item,idx) {
      return {
        link: '',
        img: item.activityPic,
        _site_: {
          p_id: t.id,
          page: '110.250.20.40.02.010.30',
          p_action_total: activityList.length,
          p_action_pos: idx,
          p_action_id: item.id
        }
      }
    });
    return retVal;
  },
  // 全国广告
  getShopAdsViewData1(){
    return this.getRoot().activityCircular || {};
  },
  // 导购员
  getShopAdsViewData2(){
    let t = this;
    let shopperList = this.getRoot().shopperList || {};
    let datas = shopperList.data || [];
    let data = datas.length > 0 ? datas[0] : {};
    let salesList = this.getRoot().SalesList || [];
    let retVal = {};
    if(!_.isEmpty(data)){
      retVal = {
        img: data.picUrl,
        name: data.nickname,
        _site_: {
          p_id: t.id,
          page: '110.250.20.40.02.010.50'
        },
        salesList:salesList
      }
    }
    return retVal;
  },
  getGoodsListViewData(){
    let productList = this.getRoot().productList || [];
    let data = [];
    _.each(productList, function (item,idx) {
      if(!item.pdtSku) {
        return;
      }
      data.push({
        id: item.pdtSku,
        title: item.pdtName,
        img: item.imgs && item.imgs[0],
        costPrice: item.salePrice,
        currentPrice: item.marketPrice,
        _site_: {
          page: '110.250.01.40.11.010.10',
          p_id: item.shopId,
          p_action_total: productList.length,
          p_action_pos: idx,
          p_action_id: item.productId
        }
      });
    });
    return data;
  },
  getShopAlbumViewData(){
    let t = this;
    let arr = t.getRoot().photoAlbum || [];
    _.each(arr, function (item,idx) {
      item._site_ = {
        page: '110.250.20.40.02.010.60',
        p_id: t.id,
        p_action_total: arr.length,
        p_action_pos: idx,
        p_action_id: item.albumId
      }
    });
    let data = {
      list: arr
    };

    return data;
  },
  getShopInfoViewData(){
    let t = this;
    let shopInfo = this.getRoot().dataDetail || {};

    shopInfo.favorite = this.getRoot().isCollect || false;
    shopInfo.merchantId = shopInfo.id || this.id;

    if(shopInfo.shopOnlineInfo){
      shopInfo.storeImg = shopInfo.shopOnlineInfo.shopPic || '';
    }else{
      shopInfo.storeImg = '';
    }
    shopInfo.collectInfo = {
      classInfo: [],
      tags: shopInfo.shopStyleTagList || [],
      img: shopInfo.brandLogo || '',
      storeName: shopInfo.shopName || ''
    }

    shopInfo.brandLogo = shopInfo.brandLogo || '';
    shopInfo.stand = shopInfo.boothDescList || [];
    shopInfo.storeName = shopInfo.shopName || '';
    shopInfo.shopOperationClassification = shopInfo.shopStyleTagList || [];
    shopInfo.score = this.getRoot().totalScore || '';

    let labelList = t.getRoot().labelList;

    _.each(labelList, function (item) {
      item.score = t.getRoot()[item.code];
    });
    shopInfo.shopDimensionScore = labelList;

    return shopInfo;
  },
  getBusinessFeatures(){
    let bfData = this.getShopInfoViewData().shopSpecialServiceTagList || [];
    return bfData;
  },
  getIntroduceData(){
    let introData = this.getShopInfoViewData().brandDescription || '';
    let data = {
      brandIntroduction: introData
    }
    return data;
  },
  getMarketViewData(){
    let marketInfo = this.getRoot().dataDetail || {};
    marketInfo = {
      img: marketInfo.marketPic || '',
      title: marketInfo.marketName || '',
      address: marketInfo.marketAddress || '',
      score: this.getRoot().marketScore,
      id: marketInfo.marketIdUuid
    };
    return marketInfo;
  },
  getCommentListViewData(){
    let t = this;
    let info = this.getRoot();
    let reviewList = {
      page: info.page,
      totalElements: info.totalElements || 0,
      totalPage: info.totalPage,
      totalScore: info.totalScore,
      currentRecords: info.reviewList,
      _site_: {
        page: '110.250.20.80.01.010.20',
        p_id: t.id
      }
    };
    reviewList.targetId = info.id || '';
    return reviewList;
  }
});
//初期导购员Slide
let sellConductorSlide = () => {
  let slideContainerConductorItemView = new SlideContainerConductorItemView({
    src: config.server.context + '/img/m/index/dianpu_daogouyuan_614x440.png'
  });
  return eventChannel.request(consts.radio.event_dialog,
    slideContainerConductorItemView);
}
const LayoutView = Backbone.View.extend({
  className: "shop-home",
  template: ShopHomeTpl(),
  updateCouponStatus(data){
    if(data) {
      this.model.updateCouponStatus(data.id, data.status);
    }
  },
  initialize(options, config){
    var t = this;
    t.id = config.merchantId;
    t.headerView = new HeaderView({}, {
      title: '店铺首页'
    });
    $('.header').html(t.headerView.render().el);
    // 容器View
    t.slideContainerView = new SlideContainerView();
    t.listenTo(t.slideContainerView, 'slide:shown', function (p) {
      eventChannel.request(consts.radio.event_rebuild_image_path, p);
    });
    //店铺信息
    let VShopInfoView = ShopInfoView.extend();
    t.shopInfoView = new VShopInfoView();
    //
    let ShopActivitySlideView = SlideView.extend({});
    t.shopActivitySlideView1 = new ShopActivitySlideView();
    t.shopActivitySlideView2 = new ShopActivitySlideView();

    let ShopAdsView = AdsView.extend({});
    // 全国促销
    t.shopAdsView1 = new ShopAdsView();

    let VSellConductorView = SellConductorView.extend({});
    // 导购员
    t.sellConductorView = new VSellConductorView();

    // 极致单品
    let VListWrapperView = ListWrapperView.extend({});
    t.listWrapperView = new VListWrapperView();
    let GoodsListView = ListView.extend({});
    t.goodsListView = new GoodsListView();
    let GoodsListItemView = ListGoodsItemView.extend({});
    t.goodsListItemView = new GoodsListItemView();
    t.goodsListView.setChildView(GoodsListItemView);
    t.listWrapperView.setChildView(t.goodsListView);

    let AlbumView = ShopAlbumView.extend({
      merchantId: config.merchantId
    });
    t.albumView = new AlbumView();
    let VMarketView = MarketView.extend({});
    t.marketView = new VMarketView();

    let VBandIntroduceView = BandIntroduceView.extend({});
    t.bandIntroduceView = new VBandIntroduceView();

    let VBusinessFeatures = BusinessFeaturesView.extend({});
    t.businessFeatures = new VBusinessFeatures();

    let VGuideManualView = GuideManualView.extend({
      // 店铺
      type: 'merchant'
    });
    t.guideManualView = new VGuideManualView();
    t.listenTo(t.guideManualView, 'coupon:status', t.updateCouponStatus);
    let VCommentWrapperView = CommentWrapperView.extend({
      type: 2
    });
    t.commentWrapperView = new VCommentWrapperView();
    let CommentListView = ListView.extend({});
    t.commentListView = new CommentListView();
    let VCommentItemView = CommentItemView.extend({
      showReply: false,
      showTarget: false,
      readonly: false,
    });
    t.commentListView.setChildView(VCommentItemView);
    t.commentListView.on('comment-item:content:click', function (id) {
      router.navigate('comment/' + id, {
        trigger: true
      });
    });
    t.commentWrapperView.setChildView(t.commentListView);

    let VAppDownloadView = AppDownloadView.extend({});
    t.appDownloadView = new VAppDownloadView();

    //t.toolBarBtnView = new ToolBarButtonView();

    //t.footerView = new FooterView();

    t.model = new Model({
      id: config.merchantId
    });

    t.listenTo(t.model, 'change:coupon', function () {
      // 放置优惠券信息
      t.guideManualView.setItems({
        coupon: t.model.getCouponViewData()
      });
    });
    t.autoTooltip = new AutoTooltip();
    t.listenTo(t.model, 'change', t.setViewDatas);
  },
  fetch(){
    this.model.fetch();
  },
  setViewDatas(model, options){
    var t = this;
    // 店铺信息
    t.shopInfoView.setItems(model.getShopInfoViewData());
    t.bandIntroduceView.setItems(model.getIntroduceData());
    t.businessFeatures.setItems(model.getBusinessFeatures());
    //
    t.shopAdsView1.setItems(model.getShopAdsViewData1());
    // 导购员
    t.sellConductorView.setItems(model.getShopAdsViewData2());
    //
    t.shopActivitySlideView1.setItems(model.getShopActivitySlideViewData1());
    // 店铺广告位
    t.shopActivitySlideView2.setItems(model.getShopActivitySlideViewData2());

    let arrL = model.getGoodsListViewData().length;
    for (var i = 0; i < arrL; i += 2) {
      var result = [];
      result.push(model.getGoodsListViewData().slice(i, i + 2));
      t.goodsListView.addOneView(result);
    }
    t.listWrapperView.setItems({len: arrL,_site_: {
      page: "110.250.20.80.01.010.10",
      p_id: t.id
    }});

    t.albumView.setItems(model.getShopAlbumViewData());

    t.marketView.setItems(model.getMarketViewData());

    t.commentWrapperView.setItems(model.getCommentListViewData());
    t.commentListView.addAll(model.getCommentListViewData().currentRecords);

    // 放置优惠券信息
    t.guideManualView.setItems({
      coupon: model.getCouponViewData()
    });
    // 标题
    t.headerView.setTitle(model.getShopInfoViewData().shopName);
    eventChannel.request(consts.radio.event_after_fetch, {
      page: '110.250.20.00.00.000.10',
      p_id: t.id
    });
    eventChannel.request(consts.radio.event_proxy_link, t.$el);
  },
  render () {
    let t = this;
    t.$el.html(t.template);
    //
    //t.$('.footer').html(t.footerView.render().el);
    // 店铺信息
    t.$('.shop-head').html(t.shopInfoView.render().el);
    t.$('.brand-introduction').html(t.bandIntroduceView.render().el);
    t.$('.business-features').html(t.businessFeatures.render().el);
    // 导购员
    t.$('.market-banner.banner2').html(t.shopAdsView1.render().el);
    t.$('.guide-manual').html(t.guideManualView.render().el);
    t.$('.sell-conductor').html(t.sellConductorView.render().el);
    // 店铺活动
    t.$('.shop-activity.act1').html(t.shopActivitySlideView1.render().el);
    t.$('.shop-activity.act2').html(t.shopActivitySlideView2.render().el);
    //t.$('.market-banner').html(t.shopAdsView.render().el);
    // 极致单品
    t.$('.goods-list').html(t.listWrapperView.render().el);
    t.$('.shop-album').html(t.albumView.render().el);
    t.$('.market').html(t.marketView.render().el);
    t.$('.comments-on').html(t.commentWrapperView.render().el);
    t.$('.app-download').html(t.appDownloadView.render().el);
    //t.$('.tool-bar').html(t.toolBarBtnView.render().el);

    //if (!storage.local.get('auto-tooltip')) {
    //  storage.local.set('auto-tooltip', Date.now() + '');
    //  _.delay(function () {
    //    t.sellConductorSlideView = sellConductorSlide();
    //    eventChannel.request(consts.radio.event_rebuild_image_path);
    //  }, 500);
    //}
    if(!storage.session.get('auto-tooltip')){
      storage.session.set('auto-tooltip', Date.now() + '');
      t.$('.auto-tooltip').html(t.autoTooltip.render().el);
      _.delay(function () {
        eventChannel.request(consts.radio.event_rebuild_image_path);
        t.$('.auto-tooltip').fadeIn();
      }, 500);
      _.delay(function () {
        t.$('.auto-tooltip').fadeOut();
      }, 5000);
    }
    return t;
  },
  destroy(){
    this._destroy();
  }
});
export default LayoutView;
