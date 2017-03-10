/**
 *
 * 我的购物清单
 **/
import Backbone from 'backbone'
import Tpl from './shop-list-album-view.tpl'
import nprogress from 'nprogress'
import Header from '../../element/view/header'
import api from '../../api/api'
import ShopAlbumListView from '../../element/view/list-view'
import ShopAlbumItemView from './shop-item-album'
import TabsView from '../../element/tabs/tabs-view'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import sdk from '../../util/sdk'



const LayoutView = Backbone.View.extend({
  className: 'shopping-list-album',
  tpl: Tpl(),
  initialize: function (options, config) {
    let t = this;
    t.id = config.id;
    t.albumId = config.albumId;
    let Model = Backbone.Model.extend({
      urlRoot: api.getUrl(api.merchant.album)+ '/' + t.id,
      getRoot(){
        return this.toJSON();
      },
      getPhotoAlbum(){
        let photoAlbumList = this.getRoot().photoAlbum || [];
        return photoAlbumList;
      },
      getPhotoAlbumDetail(){
        let photoList = this.getRoot().photoAlbumDetail || [];
        let count = photoList.length;
        _.each(photoList, function (item, idx) {
          item.index = idx;
          item.count = count;
        });
        return photoList;
      }
    });
    t.model = new Model({
      id: t.albumId,
    });
    t.headerView = new Header({}, {
      title: '设计美图'
    });
    $('.header').html(t.headerView.render().el);

    t.tabsView = new TabsView();

    t.shopAlbumListView = new ShopAlbumListView();

    t.shopAlbumListView.setChildView(ShopAlbumItemView);

    t.listenTo(t.tabsView, 'item:active', t.tabItemClick);
    this.listenTo(this.shopAlbumListView, 'img:click', this.previewImage);
    this.listenTo(this.model, 'change', this.setDatas);
  },
  tabItemClick: function (data) {
    let t = this;
    router.navigate('shopAlbum/'+ t.id +'/' + data.code, {trigger: true, replace: true});
  },
  previewImage(data){
    sdk.previewImage(data.picUrl, this.previewImages);
  },
  setDatas(){
    let t = this;
    let index = 0;
    let photoAlbum=t.model.getPhotoAlbum();
    let getPhotoAlbumDetail=t.model.getPhotoAlbumDetail();
    _.find(photoAlbum, function(item, idx){
      if(item.albumId == t.albumId) {
        index = idx;
        return true;
      }
    })
    let tabsViewDatas = _.map(photoAlbum,function (item) {
        return {
          label: item.albumName,
          code: item.albumId
        };
    })
    t.tabsView.setItems(tabsViewDatas, index);
    t.previewImages = _.map(getPhotoAlbumDetail, function (item) {
      return item.picUrl;
    });
    t.shopAlbumListView.addAll(getPhotoAlbumDetail);
    eventChannel.request(consts.radio.event_rebuild_image_path);
    nprogress.done();
  },
  render: function () {
    let t = this;
    t.$el.html(t.tpl);
    t.$('.tab-content').html(t.shopAlbumListView.render().el);
    t.$('.tabs').html(t.tabsView.render().el);
    eventChannel.request(consts.radio.event_after_fetch, {
      page: '110.250.12.00.00.000.10',
      p_id: t.albumId
    });
    return t;
  },
  fetch: function () {
    this.model.fetch();
  }
});
export default LayoutView;