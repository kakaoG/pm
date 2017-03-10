/**
 * 出错页面
 **/
import Backbone from 'backbone'
import ErrorTpl from '../template/shopWating.tpl'

import Header from '../../element/view/header'

export default Backbone.View.extend ({
  template: ErrorTpl(),
  className: 'shop-waite-view',
  render: function () {
    let HeaderView = Header.extend();
    this.headerView = new HeaderView({},{
      title: '店铺首页'
    });
    this.$el.html(this.template);

    this.trigger('enter:router');
    return this;
  }
})