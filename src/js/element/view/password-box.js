/**
 * 密码框
 **/
import Backbone from 'backbone'

import PasswordBoxTpl from '../template/password-box.hbs'

import StringUtil from '../../util/string'

var iconLabel = '<i class="iconfont icon-dianpingpswn"></i>';

var containSpecialChar = function (str) {
  var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
  return (containSpecial.test(str));
}
var LayoutView = Backbone.View.extend({
  events: {
    'click .iconfont': 'togglePassword',
  },
  //
  initialize: function (options, config, events) {
    var t = this;
    t.config = {
      type: 'password',
      label_right: iconLabel,
      disable: false,
      maxLength: 0,
      minLength: 0
    };
    _.extend(t.config, config);
    t.extEvents = events;
    t.render();
    t.initEvents();
    t.hasError = false;
  },
  render: function () {
    var t = this;
    t.$el.html(tpl(PasswordBoxTpl(), {
      data: t.config
    }));
    t.toggleFont = t.$('.iconfont');
    t.input = t.$('input');
  },
  togglePassword: function (e) {
    var t = this;
    if (t.toggleFont.hasClass('icon-dianpingpsw')) {
      t.toggleFont.removeClass('icon-dianpingpsw');
      t.toggleFont.addClass('icon-dianpingpswn');
      t.input.attr('type', 'password');
    } else {
      t.toggleFont.removeClass('icon-dianpingpswn');
      t.toggleFont.addClass('icon-dianpingpsw');
      t.input.attr('type', 'text');
    }
    t.input.focus();
  },
  getValue: function () {
    return this.input.val();
  },
  initEvents: function () {
    var t = this;
    if (t.extEvents && _.isFunction(t.extEvents.Keyup)) {
      t.input.on('input', t.extEvents.Keyup);
    }
  },
  // 密码有效性验证
  validity: function () {
    var t = this;
    var val = t.getValue();
    return StringUtil.isPassword(val, t.config.minLength, t.config.maxLength);
  },
  //是否为空
  isVerify: function () {
    var t = this;
    var v = t.getValue();
    return StringUtil.isVerify(v);
  },
  // 验证密码安全性
  validityPasswordSecurity: function () {
    var password = this.getValue();
    var securityLevelFlag = 0;
    if (password.length < 6) {
      return false;
    } else {
      if (/[a-z]/.test(password)) {
        securityLevelFlag++;    //lowercase
      }
      if (/[A-Z]/.test(password)) {
        securityLevelFlag++;    //uppercase
      }
      if (/[0-9]/.test(password)) {
        securityLevelFlag++;    //digital
      }
      if (containSpecialChar(password)) {
        securityLevelFlag++;    //specialcase
      }
      return securityLevelFlag >= 1;
    }
  }
});
export default LayoutView;