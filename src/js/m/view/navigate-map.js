/**
 *
 * 导览
 **/
import Backbone from 'backbone'
import Tpl from '../template/navigate-map.tpl'
import Header from '../../element/view/header'
import TabsView from '../../element/tabs/tabs-view'
import api from '../../api/api'
import browsers from '../../util/browsers'
import consts from '../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
var LayoutModel = Backbone.Model.extend({
  urlRoot: api.getUrl(api.market.marketFloor),
  getRoot (){
    return this.toJSON();
  },
  getFloors(){
    let root = this.getRoot();
    return _.map(root.floorList, function (item) {
      return item
    });
  }
});


var LayoutView = Backbone.View.extend({
  className: 'navigate-map-view',
  initialize: function (options, config) {
    let t = this;
    t.marketId = config.marketId;
    t.floorId = config.floorId;
    t.id = config.marketId;
    var MapModel = Backbone.Model.extend({
      urlRoot: api.getUrl(api.market.marketMap) + '/' + t.id,
      getRoot(){
        return this.toJSON();
      }
    });
    t.headerView = new Header({}, {
      title: '导览'
    });
    $('.header').html(t.headerView.render().el);

    if (browsers.weixin) {
      t.$el.css('top', consts.style.header_height);
    }
    t.tabsView = new TabsView();
    t.listenTo(t.tabsView, 'item:active', t.tabItemClick);
    t.model = new LayoutModel();
    t.model.set('id', t.id);
    t.modelMap = new MapModel();

    this.listenTo(this.model, 'change', this.setDatas);
    this.listenTo(this.modelMap, 'change', this.renderContent);
  },
  tabItemClick(data){
    let t = this;
    t.$('.summary').html(data.floorCode);
    t.modelMap.set('id', data.id);
    t.modelMap.fetch();
  },
  renderContent(data){
    let picUrl = (data.get('data') || {}).picUrl;
    this.$('.image img').attr('data-src', picUrl);
    eventChannel.request(consts.radio.event_enter_router);
  },
  setDatas(model){
    let t = this;
    let index = 0;
    let tabsViewDatas = [];
    _.each(model.getFloors(), function (item, idx) {
      let data = _.extend({}, item);
      data.label = data.floorName;
      data.floorCode = data.floorCode;
      if (item.id == t.floorId) {
        index = idx;
        t.$('.summary').html(data.floorCode);
      }
      tabsViewDatas.push(data);
    });
    t.tabsView.setItems(tabsViewDatas, index);
    eventChannel.request(consts.radio.event_rebuild_image_path);
  },
  render: function () {
    let t = this;
    t.$el.html(tpl(Tpl(), {
      data: {}
    }));
    t.$('.tabs').html(t.tabsView.render().el);
    return t;
  },
  fetch: function () {
    this.model.fetch();
  }
});
export default LayoutView;