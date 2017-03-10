import Backbone from 'backbone'

import Tpl from '../../template/index/auto-tooltip.tpl'
import consts from '../../../util/consts'

var eventChannel = Backbone.Radio.channel(consts.radio.event);

const View = Backbone.View.extend({
  className: 'auto-tooltip-view',
  template: Tpl(),
  events: {
    'click button': 'download',
    'click .close': 'closeClick'
  },
  download(){
    eventChannel.request(consts.radio.event_download);
  },
  closeClick(){
    this.remove();
  },
  initialize(){
    this.on('destroy', this.remove);
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template));
    return t;
  }
});

export default View;
