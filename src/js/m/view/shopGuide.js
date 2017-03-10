/**
 *
 * 导购员详情
 **/

import Backbone from 'backbone'
import nprogress from 'nprogress'
import ShopGuideTpl from '../template/shopGuide.tpl'


//导购信息
import CommentItemView from '../../element/view/comment-item'
import ListView from '../../element/view/list-view'
import HeaderView from '../../element/view/header'
import GuideInfoView from './guide/guide-info-view'
import BrandShopView from './guide/brandShop-view'
import GuideCouponView from './guide/guide-coupon-view'
import GuideShareView from './guide/guide-share-view'
import GuideLiveView from './guide/guide-live-view'
import CommentWrapperView from './guide/guide-wrapper-view'
import GuideActionView from './guide/guide-action-view'
import api from '../../api/api'



let Model = Backbone.Model.extend({
    urlRoot: api.getUrl(api.guide.detail),
    getRoot(){
        return this.toJSON() || {};
    },
    getGuideInfoData(){
        let data = this.getRoot().baseInfo || {};
        data.score = this.getRoot().totalScore;
        return data;
    },
    getBrandShopData(){
        return this.getRoot().baseInfo || {};
    },
    getGuideShareData(){
        return this.getRoot().guideShare || {};
    },
    getGuideLiveData(){
        return this.getRoot().currentLive[0] || {};
    },
    getCommentListViewData(){
        let t = this;
        let info = this.getRoot();
        let reviewList = {
            page: info.page,
            totalElements: info.totalElements || 0,
            totalPage: info.totalPage,
            totalScore: info.totalScore,
            labelList:info.labelList,
            currentRecords: info.reviewList,
            labelList:info.labelList,
            _site_: {
                page: '110.250.20.80.01.010.20',
                p_id: t.id
            }
        };
        reviewList.targetId = info.id || '';
        return reviewList;
    }
});




const LayoutView = Backbone.View.extend({
    className: "shop-guide",
    template: ShopGuideTpl(),
    initialize(options, config){
        var t = this;
        t.headerView = new HeaderView({}, {
            title: '导购员详情'
        });
        $('.header').html(t.headerView.render().el);

        //导购信息
        let VGuideInfoView = GuideInfoView.extend();
        t.guideInfoView = new VGuideInfoView();
        //品牌店铺
        let VBrandShop = BrandShopView.extend({});
        t.brandShopView = new VBrandShop();

        //优惠券
        let VGuideCoupon = GuideCouponView.extend({});
        t.guideCouponView = new VGuideCoupon();

        //导购分享
        let VGuideShare = GuideShareView.extend({});
        t.guideShareView = new VGuideShare();

        //导购直播
        let VGuideLive = GuideLiveView.extend({});
        t.guideLiveView = new VGuideLive();

        //评论
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

        t.guideActionView = new GuideActionView();

        t.model = new Model({
            id: config.guideId
        });

        t.listenTo(t.model, 'change', t.setViewDatas);

    },

    fetch(){
        this.model.fetch();
    },
    setViewDatas(model, options){
        var t = this;
        t.guideInfoView.setItems(model.getGuideInfoData());
        t.brandShopView.setItems(model.getBrandShopData());
        t.guideShareView.setItems(model.getGuideShareData());
        t.guideLiveView.setItems(model.getGuideLiveData());
        t.commentWrapperView.setItems(model.getCommentListViewData());
        t.commentListView.addAll(model.getCommentListViewData().currentRecords);
    },
    render () {
        let t = this;
        t.$el.html(t.template);
        t.$('.guide-head').html(t.guideInfoView.render().el);
        t.$('.brand-shop').html(t.brandShopView.render().el);
        t.$('.guide-coupon').html(t.guideCouponView.render().el);
        t.$('.comments-guide').html(t.commentWrapperView.render().el);
        t.$('.guide-live').html(t.guideLiveView.render().el);
        t.$('.guide-action').html(t.guideActionView.render().el);
        nprogress.done();
        return t
    }
})

export default LayoutView;