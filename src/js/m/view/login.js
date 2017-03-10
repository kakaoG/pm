/**
 *
 * 登录
 **/
import Backbone from 'backbone'
import LoginTpl from '../template/login.hbs'
import AuthApi from '../../api/auth'
import InputBox from '../../element/view/input-box'
import Header from '../../element/view/header'
import PasswordBox from '../../element/view/password-box'
import IdentifyingCodeBox from '../../element/view/identify-code-box'

const LayoutView = Backbone.View.extend({
  events: {
    "click button.btn-get": "submitLogin",
  },
  submitLogin: function () {
    var name = this.name_read_input.isVerify();
    // var code = this.indentify_input.isVerify();
    var password = this.password_read_input.isVerify();
    if (!name) {
      this.trigger('dialog:toast:warn', {
        code: '',
        msg: '请输入用户名',
      });
      return;
    }
    if (!password) {
      this.trigger('dialog:toast:warn', {
        code: '',
        msg: '请输入您的登录密码',
      });
      return;
    }
    this.trigger('on:form:submit');
  },
  init: function () {
    var t = this;
    var _success = function (data) {
      t.trigger('dialog:toast', {
        code: '',
        msg: '登录成功',
        callback: function () {
          Backbone.history.history.back();
        }
      });
    }
    var _error = function (code, msg) {
      t.trigger('dialog:error', {
        code: code,
        msg: msg
      });

    }
    AuthApi.login(this.name_read_input.getValue(), this.password_read_input.getValue(), _success, _error);
  },
  //
  initialize: function (options, config) {
    var t = this;
    var header = new Header({}, {
      title: '登录'
    });
    t.listenTo(this, 'on:form:submit', t.login);
  },
  //Keyup: function () {
  //  var t = this;
  //  var name = t.name_read_input.getValue();
  //  var password = t.password_read_input.getValue();
  //  if (name && password) {
  //    t.$('button.btn-get').attr("disabled", false);
  //  } else {
  //    t.$('button.btn-get').attr("disabled", true);
  //  }
  //},
  render: function () {
    var t = this;
    t.$el.html(tpl(LoginTpl()));
    t.name_read_input = new InputBox({
        el: t.$('.li-name')
      }, {
        fieldName: 'name_read_input',
        text: '',
        placeholder: '用户名/手机号/邮箱',
        readonly: false
      }
      //  {
      //  Keyup: function () {
      //    t.Keyup();
      //  }
      //}
    );
    // t.indentify_input = new IdentifyingCodeBox({
    //     el: t.$('.li-vcode')
    // });
    t.password_read_input = new PasswordBox({
        el: t.$('.li-password')
      }, {
        fieldName: 'password_read_input',
        text: '',
        placeholder: '请输入登录密码',
        readonly: false,
        maxLength: 0,
        minLength: 0
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

