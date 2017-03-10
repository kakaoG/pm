/**
 *
 * 商场首页
 **/
import Backbone from 'backbone'

import nprogress from 'nprogress'
import MallHomeTpl from '../template/mallHome.tpl'
import ListView from '../../element/view/list-view'
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

import GuideManualView from './index/guide-manual-view'
import AdsView from './index/ads-view'
import ListWrapperView from './index/list-wrapper-view'
import ListGoodsItemView from './index/list-img-item-view'
import CommentWrapperView from './index/comment-wrapper-view'
import CommentItemView from '../../element/view/comment-item'
import AppDownloadView from './index/app-download-view'
import SlideView from '../../element/view/slide-view'
import MarketInfoView from './mall/market-info-view'
import ShopNotifyView from './mall/shop-notify-view'
import SlideWrapperView from './mall/slide-wrapper-view'
import CharacteristicPlaceSlideWrapperView from './mall/characteristic-place-slide-wrapper-view'
import SellConductorView from './mall/sell-conductor-view'
import BrandInfoRecommendationView from './mall/brand-info-recommendation-view'
import MarketServiceView from './mall/market-service-view'

import consts from '../../util/consts'
import api from '../../api/api'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({
  urlRoot: api.getUrl(api.market),
  getRoot(){
    return this.toJSON() || {};
  },
  getCouponViewData(){
    let dataList = this.getRoot().couponList || [];
    let dataObj = {
      coupons: []
    };
    _.each(dataList, function (res) {
      let condition = [];
      if(_.isArray(res.promotionConditionResults)&&res.promotionConditionResults.length>0){
        condition = res.promotionConditionResults[0]
      }
      let status = res.status;
      if(status == 4) {
        status = 0;
      }
      let item = {
        id: res.id,
        title: res.name,
        condition: '', //condition || '',
        expiryDate: {
          from: res.startT,
          to: res.endT
        },
        status: status //res.status
      };
      dataObj.coupons.push(item);
    })
    return dataObj;//this.getRoot().coupon || {};
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
    console.log('root', this.getCouponViewData())
  },
  getMarketSlideViewData(){
    let advertList = this.getRoot().advertList || {};
    let retVal = _.map(advertList, function (item) {
      return {
        link: item.linkUrl,
        img: item.imgUrl
      }
    });
    return retVal;
  },
  getMarketInfoViewData(){
    let rootInfo = this.getRoot();
    let marketInfo =  rootInfo.dataDetail || {};
    let labelList = rootInfo.labelList || {};
    labelList = _.each(labelList, function (item) {
      item.score = rootInfo[item.code];
    });

    return {
      mallId :  this.id,
      title : marketInfo.marketName,
      marketAddress : marketInfo.marketAddress,
      visits : rootInfo.totalScore,
      favorite : rootInfo.isCollect,
      shopDimensionScore: labelList
    }
  },
  getHeadInfoData(){
    let rootInfo = this.getRoot();
    let headInfo = rootInfo.dataDetail || {};
    let title = headInfo.marketShort;
    return title;
  },
  getShopNotifyViewData(){
    return this.getRoot().notice || {};
  },
  getShopAdsViewData(){
    return this.getRoot().activityCircular || {};
  },
  // 独特体验-商场广告
  getUniqueExperienceViewData(){
    let rootInfo = this.getRoot();
    let marketBanner = rootInfo.tasteList || [];
    let retVal = _.map(marketBanner, function (item) {
      return {
        img: item.coverImgUrl
      }
    });
    return retVal;
  },
  // 特色场馆
  getCharacteristicPlaceViewData(){
    let articleList = this.getRoot().articleList || [];
    let retVal = _.map(articleList, function (item) {
      return {
        img: item.coverImgUrl
      }
    });
    return retVal;
  },
  getSellConductorViewData(){
    let guideList = this.getRoot().guideList || {};
    let sellConductorTop10 = _.map(guideList,function(item){
      return{
        img : item.picUrl,
        name : item.nickname,
        id : item.id,
        openId: item.openId
      }
    })
    return sellConductorTop10;
  },
  getBrandRecommendationData(){
    let brandRecommendation =  this.getRoot() || {};
    let brandData = {
      labelList: brandRecommendation.categoryList || [],
      logoList: brandRecommendation.brandList || [],
      floorList: brandRecommendation.floorList || []
    };

    return brandData;
  },
  getGoodsListViewData(){
    let pro = this.getRoot().productList || {};
    let goodsList = _.map(pro,function (item) {
      return {
        //text : item.brandName,
        //currentPrice : item.salePrice,
        //costPrice : item.marketPrice,
        id: item.id,
        title: item.title,
        img : item.coverImgUrl
      }
    })
    return goodsList;
  },
  getFloorListData(){
    let floorList = this.getRoot().floorList || {};
    if(floorList.length>0){
      return  {
        floorId : floorList[0].id
      }
    }else{
      return {}
    }
  },
  getMarketServiceViewData(){
    let rootInfo = this.getRoot();
    let serviceInfo =  rootInfo.dataDetail || {};
    return {
      address : serviceInfo.marketAddress,
      openingHours : serviceInfo.openingHours,
      complaintTel : '4008-123-123'
    }
  },
  getCommentListViewData(){
    let info = this.getRoot();
    let reviewList = {
      page: info.page,
      totalElements: info.totalElements || 0,
      totalPage: info.totalPage,
      totalScore: info.totalScore,
      currentRecords: info.reviewList
    };
    reviewList.targetId = info.id || '';
    return reviewList;
  }
});

const LayoutView = Backbone.View.extend({
  className: "mall-home",
  template: MallHomeTpl(),
  initialize(options, config){
    var t = this;
    t.id = config.mallId;
    t.headerView = new HeaderView({}, {
      title : '商场首页'
    });
    $('.header').html(t.headerView.render().el);
    //头部信息
    // let MarketHeadView = HeaderView.extend({});
    // t.marketHeadView = new MarketHeadView();
    //商场banner模块
    let MarketSlideView = SlideView.extend({});
    t.marketSlideView = new MarketSlideView();
    //商场信息模块
    let VMarketInfoView = MarketInfoView.extend({});
    t.marketInfoView = new VMarketInfoView();

    //商场通知模块
    let VShopNotifyView = ShopNotifyView.extend({});
    t.shopNotifyView = new VShopNotifyView();

    //清单模块
    let VGuideManualView = GuideManualView.extend({
      type: 'market'
    });
    t.guideManualView = new VGuideManualView();

    //活动模块
    let ShopAdsView = AdsView.extend({});
    t.shopAdsView = new ShopAdsView();
    // 特色场馆
    t.characteristicPlaceWrapperView = new CharacteristicPlaceSlideWrapperView();
    t.characteristicPlaceView = new SlideView();
    t.characteristicPlaceWrapperView.setChildView(t.characteristicPlaceView);
    //独特体验模块
    let VSlideWrapperView = SlideWrapperView.extend({});
    t.slideWrapperView = new VSlideWrapperView();
    t.uniqueSlideView = new SlideView();
    t.slideWrapperView.setChildView(t.uniqueSlideView);

    //导购员模块V
    let VSellConVductorView = SellConductorView.extend({});
    t.sellConductorView = new VSellConVductorView();

    //品牌推荐模块
    let VBrandInfoRecommendationView = BrandInfoRecommendationView.extend({
      marketId: t.id
    });
    t.brandInfoRecVommendationView = new VBrandInfoRecommendationView();

    //商品列表模块
    let VListWrapperView = ListWrapperView.extend({});
    t.listWrapperView = new VListWrapperView();
    let GoodsListView = ListView.extend({});
    t.goodsListView = new GoodsListView();
    let GoodsListItemView = ListGoodsItemView.extend({});
    t.goodsListItemView = new GoodsListItemView();
    t.goodsListView.setChildView(GoodsListItemView);
    t.listWrapperView.setChildView(t.goodsListView);

    //商城服务模块
    let VMarketServiceView = MarketServiceView.extend({});
    t.marketServiceView = new VMarketServiceView();

    let VCommentWrapperView = CommentWrapperView.extend({
      type: 1
    });
    t.commentWrapperView = new VCommentWrapperView();
    let CommentListView = ListView.extend({});
    t.commentListView = new CommentListView();
    let VCommentItemView = CommentItemView.extend({
      showReply: false,
      showTarget: false,
      readonly: false
    });
    t.commentListView.setChildView(VCommentItemView);
    t.commentWrapperView.setChildView(t.commentListView);
    t.commentListView.on('comment-item:content:click', function (id) {
      router.navigate('comment/' + id, {
        trigger: true
      });
    });

    let VAppDownloadView = AppDownloadView.extend({});
    t.appDownloadView = new VAppDownloadView();

    t.model = new Model({
      id: config.mallId
    });

    t.listenTo(t.model, 'change', t.setViewDatas);
  },
  fetch(){
    this.model.fetch();
  },
  setViewDatas(model, options){
    var t = this;
    //头部数据
    // console.info(model.getHeadInfoData());
    // t.marketHeadView.setTitle(model.getHeadInfoData());
    //banner数据
    t.marketSlideView.setItems(model.getMarketSlideViewData());
    //info数据
    // console.info(model.getMarketInfoViewData())
    t.marketInfoView.setItems(model.getMarketInfoViewData());
    //star
    t.marketInfoView.updateShopScore(model.getMarketInfoViewData(),model.getMarketInfoViewData().visits);
    //notice数据
    t.shopNotifyView.setItems(model.getShopNotifyViewData());
    //特色场馆
    t.characteristicPlaceView.setItems(model.getCharacteristicPlaceViewData());
    //独特体验数据
    t.uniqueSlideView.setItems(model.getUniqueExperienceViewData());
    //导购员数据
    t.sellConductorView.setItems(model.getSellConductorViewData());
    //品牌推荐数据
    t.brandInfoRecVommendationView.setItems(model.getBrandRecommendationData());


    t.shopAdsView.setItems(model.getShopAdsViewData());

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
    //商城服务数据
    t.marketServiceView.setItems(model.getMarketServiceViewData());
    //评论
    t.commentWrapperView.setItems(model.getCommentListViewData());
    t.commentListView.addAll(model.getCommentListViewData().currentRecords);

    // 放置优惠券信息
    t.guideManualView.setItems({
      coupon: model.getCouponViewData(),
      navigatemap : model.getFloorListData(),
      id : t.id
    });
    eventChannel.request(consts.radio.event_proxy_link, t.$el);
    // 标题
    t.headerView.setTitle(model.getMarketInfoViewData().title);
    eventChannel.request(consts.radio.event_after_fetch, {
      page: '110.200.20.00.00.000.00',
      p_id: t.id
    });
  },
  render () {
    let t = this;
    t.$el.html(t.template);
    //商场banner模块
    // $('.header').html(t.marketHeadView.render().el);
    t.$('.market-banner').html(t.marketSlideView.render().el);
    //商场信息模块
    t.$('.market-head').html(t.marketInfoView.render().el);
    //商场通知模块
    t.$('.shop-notify').html(t.shopNotifyView.render().el);
    //清单模块
    t.$('.guide-manual').html(t.guideManualView.render().el);
    //活动模块
    t.$('.activity-circular').html(t.shopAdsView.render().el);
    // 特色场馆
    t.$('.characteristic-place').html(t.characteristicPlaceWrapperView.render().el);
    //独特体验模块
    t.$('.unique-experience').html(t.slideWrapperView.render().el);
    //导购员模块
    t.$('.sell-conductor-top10').html(t.sellConductorView.render().el);
    //品牌推荐
    t.$('.brand-info-recommendation').html(t.brandInfoRecVommendationView.render().el);
    //商品列表
    t.$('.goods-list').html(t.listWrapperView.render().el);
    //商城服务
    t.$('.market-service').html(t.marketServiceView.render().el);
    t.$('.comments-on').html(t.commentWrapperView.render().el);
    t.$('.app-download').html(t.appDownloadView.render().el);

    return t;
  }
});
export default LayoutView;
