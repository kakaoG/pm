/**
 *
 * 我的购物清单
 **/
import Backbone from 'backbone'
import Tpl from './shopping-list.tpl'
import nprogress from 'nprogress'
import Header from '../../element/view/header'
import api from '../../api/api'
import ShoppingListView from '../../element/view/list-view'
import ShoppingListItemView from './shopping-list-item-view'
import ShoppingListScanQRCodeView from './shopping-list-scan-qrcode-view'
import sdk from '../../util/sdk'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);


// 购物清单分类
let Model = Backbone.Model.extend({
  url: api.getUrl(api.user.inventory.list),
  getRoot(){
    return this.toJSON().data;
  },
  getShoppingList(){
    let rootData = this.getRoot() || [];
    let data = _.filter(rootData, function (item) {
      if(item.objectId == -2 && !item.pic){
        item.pic = './img/m/dianping_daogou.jpg';
      }
      return item.objectId > 0 || item.objectId == -2;
    });
    return data;
  }
});
// 购物清单详情
let ProductModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.user.inventory.goods),
  getRoot(){
    return this.toJSON() || {};
  },
  getShoppingList(){
    let data = this.getRoot().data || [];
    _.each(data.data, function (item) {
      item.objectName = item.goodsName;
      item.pic = item.picUrl;
    })
    return data.data || [];
  }
});
const LayoutView = Backbone.View.extend({
  className: 'shopping-list-view',
  events: {
    'click .scan-qrcode-btn': 'shoppingListScanQRCodeViewImgClick'
  },
  shoppingListItemViewClick(modelObj){
    let t = this;
    if(t.id) {
      eventChannel.request(consts.radio.event_navigate, 'product/' + modelObj.sku)
    } else {
      let id = modelObj.objectId;
      eventChannel.request(consts.radio.event_navigate, 'shoppingList/' + id);
    }
  },
  initialize: function (options, config) {
    let t = this;
    t.id = config.id;
    let title = '';
    if (config.type == 1 || t.id == '-2') {
      title = '导购手册';
    } else {
      title = '购物清单';
    }
    t.headerView = new Header({}, {
      title: title
    });
    $('.header').html(t.headerView.render().el);
    t.shoppingListScanQRCodeView = new ShoppingListScanQRCodeView();
    t.listenTo(t.shoppingListScanQRCodeView, 'item:image:click', t.shoppingListScanQRCodeViewImgClick);
    t.shoppingListView = new ShoppingListView();
    t.shoppingListView.setChildView(ShoppingListItemView);
    t.listenTo(t.shoppingListView, 'item:image:click', t.shoppingListItemViewClick);
    t.model = null;
    if(t.id) {
      t.model = new ProductModel();
      t.model.set('id', t.id);
    } else {
      t.model = new Model();
    }
    this.listenTo(this.model, 'change', this.setDatas);
    this.data = [];
  },
  shoppingListScanQRCodeViewImgClick(){
    sdk.scanQRCode({
      success: function (qrcode) {
        let rx = new RegExp(/^.*\/product\/(\w+)$/);
        if(rx.test(qrcode)) {
          let code = RegExp.$1;
          eventChannel.request(consts.radio.event_navigate, 'product/' + code)
        } else {
          eventChannel.request(consts.radio.event_dialog_toast, {
            code: '',
            msg: '请扫描有效的商品.'
          });
        }
      }
    })
  },
  setDatas(){
    let t = this;
    let shoppingList = t.model.getShoppingList();
    if(shoppingList.length == 0) {
      t.shoppingListScanQRCodeView.$el.show();
    } else {
      t.shoppingListView.addAll(shoppingList);
    }
    nprogress.done();
    eventChannel.request(consts.radio.event_rebuild_image_path);
  },
  render: function () {
    let t = this;
    t.$el.html(Tpl());
    t.$('.list').html(t.shoppingListView.render().el);
    t.$('.scan-qrcode').html(t.shoppingListScanQRCodeView.render().el);
    if(t.id) {
      t.$('.scan-qrcode-btn').hide();
    }
    return t;
  },
  fetch: function () {
    this.model.fetch();
  }
});
export default LayoutView;