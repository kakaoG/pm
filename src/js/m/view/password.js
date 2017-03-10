/**
 *
 * 修改密码
 **/
import Backbone from 'backbone'
import PasswordTpl from '../template/password.tpl'
import AuthApi from  '../../api/auth'
import UserApi from '../../api/user'
import InputBox from '../../element/view/input-box'
import Header from '../../element/view/header'
import IdentifyingCodeBox from '../../element/view/identify-code-box'
import PasswordBox from '../../element/view/password-box'
import HxView from '../../components/hx-view'

var LayoutView = HxView.extend({
  events: {
    "click button.btn-get": "submitRegister",
  },
  submitRegister: function () {
    var phone = this.phone_read_input.isPhone();
    var code = this.indentify_input.isVerify();
    var password = this.password_read_input.validity();
    if (!phone) {
      this.trigger('dialog:toast:warn', {
        code: '',
        msg: "请输入正确的11位手机号",
      });
      return;
    } else if (!code) {
      this.trigger('dialog:toast:warn', {
        code: '',
        msg: "请输入短信验证码"
      });
      return;
    } else if (!password) {
      this.trigger('dialog:toast:warn', {
        code: '',
        msg: "请输入6-20位密码"
      });
      return;
    } else {
      if (!this.password_read_input.validityPasswordSecurity()) {
        this.trigger('dialog:error', {
          code: 'E10001',
          msg: '密码安全性低,请重新输入'
        });
        return;
      }
    }
    this.resetPassword();
  },
  resetPassword: function () {
    var t = this;
    var _success = function (data) {
      _log('更改成功');
      t.trigger('dialog:toast:success', {
        code: '',
        msg: '新密码设置成功',
        callback: function () {
          Backbone.history.history.back();
        }
      });
    }
    var _error = function (code, msg) {
      _log('更改失败');
      t.trigger('dialog:toast:warn', {
        code: code,
        msg: msg
      });

    }

    AuthApi.resetPassword(this.phone_read_input.getValue(), this.indentify_input.getValue(), this.password_read_input.getValue(), _success, _error);
  },            //
  beforeRender: function (options, config) {
    _log('coinfig', this.config);
    var type = this.config.type;
    if (type == 1) {
      var header = new Header({}, {
        title: '修改密码'
      });
    } else if (type == 2) {
      var header = new Header({}, {
        title: '忘记密码'
      });
    }
  },
  identifyingCodeSend: function () {
    var t = this;
    _log('identifyingCodeSend');
    var success = function (data) {
      _log('获取验证码成功');
      t.trigger('dialog:toast', {
        code: '',
        msg: '已发送'
      });
    }
    var error = function (code, msg) {
      _log('获取验证码失败');
      t.indentify_input.trigger('counter:reset');
      t.trigger('dialog:error', {
        code: code,
        msg: msg
      });

    }
    UserApi.sendMsg(this.phone_read_input.getValue(), 'retrievePassword', success, error);
  },
  afterRender: function () {
    var t = this;
    t.listenTo(t.indentify_input, 'identifyingCode:send', t.identifyingCodeSend);
  },
  //Keyup: function () {
  //  var t = this;
  //  var name = t.phone_read_input.getValue();
  //  var code = t.indentify_input.getValue();
  //  var password = t.password_read_input.getValue();
  //  if (name && code && password) {
  //    t.$('button.btn-get').addClass("disabled").attr("disabled", false);
  //  } else {
  //    t.$('button.btn-get').removeClass("disabled").attr("disabled", true);
  //  }
  //},
  render: function () {
    var t = this;
    t.$el.html(tpl(PasswordTpl));
    t.phone_read_input = new InputBox({
      el: t.$('.li-phone')
    }, {
      fieldName: 'phone_read_input',
      text: '',
      placeholder: '请输入您的手机号',
      readonly: false
    }
    //  {
    //  Keyup: function () {
    //    t.Keyup();
    //  }
    //}
    );
    t.indentify_input = new IdentifyingCodeBox({
      el: t.$('.li-vcode')
    });
    t.password_read_input = new PasswordBox({
      el: t.$('.li-password')
    }, {
      fieldName: 'password_read_input',
      text: '',
      placeholder: '请重新设置密码',
      readonly: false,
      maxLength: 20,
      minLength: 6
    }
    //  {
    //  Keyup: function () {
    //    t.Keyup();
    //  }
    //}
    );
    return t;
  },

});

export default LayoutView;
