/**
 * 广告显示组件
 */

import Backbone from 'backbone'

import AppDownloadViewTpl from '../../template/index/app-download-view.tpl'
import consts from '../../../util/consts'

var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'app-download-view',
  template: AppDownloadViewTpl(),
  events: {
    'click .download': 'download'
  },
  initialize(){
    var t = this;
    t.model = new Model();
    t.listenTo(t, 'destroy', t.destroy);
    t.listenTo(t.model, 'change', t.render);
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  render(){
    var t = this;
    t.$el.html(tpl(t.template, {
      data: t.model.toJSON()
    }));
    return t;
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  },
  destroy () {
    var t = this;
    t.remove();
  }
});

export default LayoutView;