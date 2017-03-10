/**
 *
 * 分享店铺二维码
 **/
import Backbone from 'backbone'
import ShareQRCodeTpl from '../template/shareQRCode.tpl'
import Header from '../../element/view/header'
import HxView from '../../components/hx-view'

var LayoutView = HxView.extend({
  events: {
    'click .shareCode button': 'show',
    'click .shareCode .mask': 'hide'
  },
  beforeRender: function (options, config) {
    var t = this;
    var header = new Header({}, {
      title: '店铺名称'
    });
  },
  render: function () {
    var qrCodeUrl = '/API/merchant/QRCode/create?code=' + this.config.merchantId;
    this.$el.html(tpl(ShareQRCodeTpl(),{
      data: {
        qrCodeUrl: qrCodeUrl
      }
    }));
    this.reBuildImage();
    return this;
  },
  show: function (e) {
    this.$('.mask').fadeIn()
  },
  hide: function (e) {
    this.$('.mask').fadeOut();
  }
});
export default LayoutView;