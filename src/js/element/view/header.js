/**
 * 头
 **/
import Backbone from 'backbone'

import HeaderTpl from '../template/header.tpl'
import browsers from '../../util/browsers'

var LayoutView = Backbone.View.extend({
  events: {
    'click .goback-button': 'goBack'
  },
  goBack(){
    let t = this;
    t.trigger('back:click');
  },
  defaultBack(){
    if(this.config.useDefault) {
      history.back();
    }
  },
  //
  initialize: function (options, config) {
    var t = this;
    t.config = {
      title: 'M站',
      useDefault: true
    };
    _.extend(t.config, config);
    t.on('back:click', t.defaultBack);
    t.render();
  },
  render: function () {
    var t = this;
    $('title').text(this.config.title);
    var body = document.getElementsByTagName('body')[0];
    document.title = this.config.title;
    if (browsers.isWeixin()) {
      // 设置title
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", "/errorpage/images/404.png");
      iframe.setAttribute("style", "display:none");
      iframe.addEventListener('load', function () {
        setTimeout(function () {
          iframe.removeEventListener('load', this);
          document.body.removeChild(iframe);
        }, 0);
      });
      document.body.appendChild(iframe);
    } else {
      t.$el.html(tpl(HeaderTpl(), {
        data: {
          text: this.config.title
        }
      }));
    }
    return t;
  },
  setTitle: function (title) {
    var t = this;
    t.config.title = title;
    t.render();
  },
  getTitle(){
    return this.config.title;
  }
});
export default LayoutView;