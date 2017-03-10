/**
 * 设计美图
 */

import Backbone from 'backbone'
import ShopAblumViewTpl from '../../template/index/shop-album-view.tpl'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);

let Model = Backbone.Model.extend({
  getAlbumList(){
    return this.get('list') || []
  },
  getFirstAlbum(){
    let albumList = this.getAlbumList();
    if(albumList.length > 0) {
      return albumList[0];
    } else {
      return {};
    }
  }
});

const LayoutView = Backbone.View.extend({
  className: 'album',
  merchantId:'',
  template: ShopAblumViewTpl(),
  events: {
    'click .more': 'moreClick'
  },
  moreClick(){
    let albumId= this.model.getFirstAlbum().albumId;
    eventChannel.request(consts.radio.event_navigate, 'shopAlbum/' + this.merchantId + '/' + albumId);
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);

  },
  render(){
    var t = this;
    var data = _.extend({
      list: [],
      merchantId: t.merchantId
    }, t.model.toJSON());
    t.$el.html(tpl(t.template, {
      data: data
    }));

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