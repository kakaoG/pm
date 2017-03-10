/**
 *
 * 导购员详情
 **/

import Backbone from 'backbone'
import nprogress from 'nprogress'
import Tpl from './article.tpl'


//导购信息
import ListView from '../../element/view/list-view'
import HeaderView from '../../element/view/header'

import CommentItemView from '../../element/view/comment-item'
import CommentWrapperView from '../view/index/comment-wrapper-view'
import ArticleInfoView from './article-info-view'
import ArticleShopView from './article-shop-view'
import api from '../../api/api'

let Model = Backbone.Model.extend({
    urlRoot: api.getUrl(api.article.detail),
    getRoot(){
        return this.toJSON() || {};
    },
    getArticleInfoData(){
      return this.getRoot().dataDetail || {};
    },
    getArticleShopData(){
      return this.getRoot().dataDetail || {};
    },
    getCommentListViewData(){
      let t = this;
      let info = this.getRoot();
      let reviewList = {
        page: info.page,
        totalElements: info.totalElements || 0,
        totalPage: info.totalPage,
        totalScore: info.totalScore,
        labelList:info.labelList || '',
        currentRecords: info.commentList,
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
    className: "article-show",
    template: Tpl(),
    initialize(options, config){
        var t = this;
        t.headerView = new HeaderView({}, {
            title: '房间示范'
        });
        $('.header').html(t.headerView.render().el);


        //文章示列
        let VArticleInfoView = ArticleInfoView.extend({})
        t.articleInfoView = new VArticleInfoView();

        //店铺模块
        let VArticelShopView = ArticleShopView.extend({})
        t.articleShopView = new VArticelShopView();

        //评论
        let VCommentWrapperView = CommentWrapperView.extend({
          type: 6
        });

        t.commentWrapperView = new VCommentWrapperView();
        let CommentListView = ListView.extend({});
        t.commentListView = new CommentListView();
        let VCommentItemView = CommentItemView.extend({
          showReply: false,
          showTarget: false,
          readonly: false,
          showStar:false
        });
        t.commentListView.setChildView(VCommentItemView);
        t.commentListView.on('comment-item:content:click', function (id) {
          router.navigate('comment/' + id, {
            trigger: true
          });
        });
        t.commentWrapperView.setChildView(t.commentListView);

        t.model = new Model({
            id: config.articleId
        });

        t.listenTo(t.model, 'change', t.setViewDatas);

    },

    fetch(){
        this.model.fetch();
    },
    setViewDatas(model, options){
        var t = this;
        t.commentWrapperView.setItems(model.getCommentListViewData());
        t.commentListView.addAll(model.getCommentListViewData().currentRecords);
        t.articleInfoView.setItems(model.getArticleInfoData());
        t.articleShopView.setItems(model.getArticleShopData());
    },
    render () {
        let t = this;
        t.$el.html(t.template);
        t.$('.comments-on').html(t.commentWrapperView.render().el);
        t.$('.article-info').html(t.articleInfoView.render().el);
        t.$('.article-shop').html(t.articleShopView.render().el);
        nprogress.done();
        return t;
    }
})

export default LayoutView;
