
import Backbone from 'backbone'

import Tpl from '../../template/guide/guide-action-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  events:{
    'click .action-zx': 'showDetailClick',
    'click .action-yy': 'showDetailClick'
  },
  className: 'guide-action-view',
  template: Tpl(),
  initialize(){
    var t = this;
    t.model = new Model();
  },
  showDetailClick(){
    let slideContainerDefaultItemView = new SlideContainerDefaultItemView({
      title: '联系导购员',
      content: '请到APP中查看',
      btnText: '立即下载'
    });
    this.listenTo(slideContainerDefaultItemView, 'btn:click', this.download);
    this.slideContainerView = eventChannel.request(consts.radio.event_dialog,
        slideContainerDefaultItemView);
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  render() {
    var t = this;
    t.$el.html(t.template);
    return t
  }
});

export default LayoutView;