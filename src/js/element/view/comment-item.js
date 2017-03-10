/**
 *
 * 点评列表Item
 **/
import Backbone from 'backbone'


import CommentItemTpl from '../template/comment-item.tpl'
import ListItemView from './list-item-view'
import HxView from '../../components/hx-view'
import StarBox from './star-box'
import ReviewAPI from '../../api/review'
import StringUtil from '../../util/string'
import Helper from '../../core/view-helper'
import sdk from '../../util/sdk'
import api from '../../api/api'
import DynamicView from './dynamic-view'
import Role from '../../util/role'

const PraiseTemplate =
  `<span class="iconfont <#=iconzan#> praise <#=state1#>">
    <#if(readonly || liked){
      echo(likedCount || 0);
    } else {
      echo('赞');
    }#>
  </span>`;

let PraiseModel = Backbone.Model.extend({
  urlRoot: api.getUrl('review.praise')
});

const LayoutView = Helper.createView({
    showReply: true,
    showTarget: true,
    tagName: 'li',
    className: 'list comment-item',
    readonly: false,
    hasAction: false,
    showContent: false,
    showStar: true,
    initialize: function () {
      var t = this;
      if (t.model) {
        t.listenTo(t.model, 'destroy', t.destroy);
        t.listenTo(t.model, 'change:id', t.render);
      }
      var StarBoxModel = Backbone.Model.extend({
        score: 0,
      });
      t.starBoxModel = new StarBoxModel();
      let DynamicModel = Backbone.Model.extend({
        defaults: {
          iconzan: 'icon-iconzan1',
          state1: 'state1',
          liked: false,
          likedCount: 0,
          readonly: t.readonly
        }
      });
      t.dynamicModel = new DynamicModel();
      t.dynamicView = new DynamicView({
        template: PraiseTemplate,
        model: t.dynamicModel,
        events: {
          'click .praise': 'praise'
        },
        methods: {
          praise(){
            if (!this.model.get('readonly')) {
              this.trigger('praise', !this.model.get('liked'));
            }
          }
        }
      });
      t.listenTo(t.dynamicView, 'praise', t.praise)
    },
    //点赞
    praise: function (praised) {
      var t = this;

      let id = t.model.get('id');
      let success =
        (data) => {
          let dataMap = data.toJSON();
          let iconzan = 'icon-iconzan1';
          let state1 = '';
          if (praised) {
            iconzan = 'icon-iconzan';
            state1 = 'state1';
          }
          t.dynamicModel.set({
            likedCount: dataMap.likedNumber,
            iconzan: iconzan,
            state1: state1,
            liked: praised
          });
        };
      let praiseModel = new PraiseModel();
      // 赞
      if (praised) {
        // 点赞
        praiseModel.set({
          id: id,
          type: 'Add'
        });
      } else {
        // 取消
        if (!Role.isLogin({role: true})) {
          return;
        }
        praiseModel.set({
          id: id,
          type: 'Cancel'
        });
      }
      praiseModel.save(null, {
        success: success
      });
    },
    /**
     * 清除
     */
    destroy: function () {
      var t = this;
      // 清除starBox
      if (t.starBoxModel) {
        t.starBoxModel.destroy();
      }
      // 销毁
      t.remove();
    },
    contentClick(){
      this.trigger('comment-item:content:click', this.model.get('id'));
    },
    events: function () {
      var t = this;
      var events = {
        'click .up': 'fullText',
        'click .li-img img': 'previewImage',
        'click .content': 'contentClick',
        'click .action .del': 'actionDelClick'
      };
      return events;
    },
    actionDelClick(){
      this.trigger('comment-item:action:del:click', this.model.get('id'));
    },
    previewImage: function (e) {
      var $target = $(e.currentTarget);
      var localIds = [];
      $target.parent().find('img').each(function (index, item) {
        localIds.push(item.src);
      });
      sdk.previewImage($target.attr('src'), localIds);
    }
    ,
//全文
    fullText: function (e) {
      var t = $(e.currentTarget);
      if (t.html() == "全文") {
        t.parent().prev("li").css({"display": "block"});
        t.html("收起");
      } else {
        t.parent().prev("li").css("display", "-webkit-box");
        t.html("全文");
      }
    }
    ,
// 生成画面
    render: function () {
      var t = this;
      t.data = t.model.toJSON();
      t.data.showStar = t.showStar;
      t.data.readonly = t.readonly;
      t.data.hasAction = t.hasAction;
      t.data.showReply = t.showReply;
      t.data.showTarget = t.showTarget;
      t.data.showContent = t.showContent;
      t.data.redstarReviewReplies = t.data.redstarReviewReplies || [];
      t.data._pics = [];
      if(t.data.auth == undefined) {
        t.data.auth = false;
      }
      if (t.data.picture && _.isString(t.data.picture)) {
        t.data._pics = t.data.picture.split(',');
      }
      if (t.data.userLiked || !!t.readonly) {
        t.dynamicModel.set('iconzan', 'icon-iconzan');
        t.dynamicModel.set('state1', 'state1');
      } else {
        t.dynamicModel.set('iconzan', 'icon-iconzan1');
        t.dynamicModel.set('state1', '');
      }
      t.dynamicModel.set('liked', t.data.userLiked);
      t.dynamicModel.set('likedCount', t.data.likedNumber);
      t.$el.html(tpl(CommentItemTpl(), {
        data: t.data,
        StringUtil: StringUtil
      }));
      if (t.showContent) {
        t.$('.content,.review-replies .text').css('display', 'block');
      }
      // 设置星星
      t.starBoxModel.set({
        score: t.data.score
      });
      t.starBox = new StarBox({
        model: t.starBoxModel
      });
      t.$('.sum-score').html(t.starBox.render().el);
      t.$('.div-other').html(t.dynamicView.render().el);
      return t;
    }
  })
  ;
export default LayoutView;
