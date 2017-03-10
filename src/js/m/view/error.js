/**
 * 出错页面
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import ErrorTpl from '../template/error.tpl'

import Header from '../../element/view/header'

const View = Backbone.View.extend ({
  template: ErrorTpl(),
  isModule: false,
  render: function () {
    nprogress.done();
    if(!this.isModule) {
      this.headerView = new Header({},{
        title: '这里什么都没有'
      });
      $('.header').html(this.headerView.render().el);
    }
    this.$el.html(this.template);
    return this;
  }
});
export default View;