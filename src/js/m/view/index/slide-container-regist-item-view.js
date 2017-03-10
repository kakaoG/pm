import Backbone from 'backbone'
import Tpl from '../../template/index/slide-container-regist-item-view.tpl'
import InputBoxView from '../../../element/view/input-box'
import IdentifyingCodeBoxView from '../../../element/view/identify-code-box'
import api from '../../../api/api'
import StringUtil from '../../../util/string'
import consts from '../../../util/consts'
import objectUtil from '../../../util/object'
import config from '../../../core/config'
import cookie from '../../../util/cookie'
import uuid from 'node-uuid'
import role from '../../../util/role'

let TelModel = Backbone.Model.extend();
let IndentifyModel = Backbone.Model.extend();
let WxUserModel = Backbone.Model.extend({
  url: api.getUrl(api.wx.user)
});
let LoginModel = Backbone.Model.extend({
  url: api.getUrl(api.user.uc.shortcutSignin, api.user.uc.contextPath)
});
let SendMsgModel = Backbone.Model.extend({
  url: api.getUrl(api.user.uc.smsCode, api.user.uc.contextPath),
  defaults: {
    smsType: '10000'
  }
});
let eventChannel = Backbone.Radio.channel(consts.radio.event);
export default Backbone.View.extend({
  className: 'slide-container-regist-item',
  template: Tpl(),
  events: {
    'click button': 'btnClick',
    'click .icon-close': 'btnCloseClick',
    'submit form': 'formSubmit'
  },
  formSubmit(e){
    e.preventDefault();
    // 调整位置
    $(e.currentTarget).find('input').blur();
    let t = this;
    // 验证电话号码
    if(!t.telInput.isPhone()) {
      t.errorInvalidPhoneNumber();
      return;
    }
    let identifyingCode = t.identifyingCodeBox.getValue();
    if (!identifyingCode) {
      eventChannel.request(consts.radio.event_dialog_error, {
        code: 'E200012',
        msg: '请输入有效的验证码!'
      });
      return;
    }
    let mobile = t.telInput.getValue();
    // 获取微信信息
    let wxModel = new WxUserModel();
    wxModel.fetch({
      success: function (data) {
        let wxData = data.toJSON();
        t.loginModel = new LoginModel({
          mobile: '',
          smsCode: ''
        });
        t.loginModel.save(null, {
          emulateJSON: true,
          data: objectUtil.convertJsonToFormData({
            'smsCode': identifyingCode,
            'mobile': mobile,
            'appId': config.uc.appId,
            'appSecret': config.uc.appSecret,
            nickName: wxData.nickName || '',
            openid:role.getOpenId() || '',
            platform:2001,
            avatar: wxData.headImageUrl || '',
          }),
          success: function (data) {
            $nvwa.cookie.setCookie(consts.global_keys.token, uuid.v4());
            role.save(data.toJSON());
            t.trigger('destroy');
            if (t.callback) {
              t.callback(t.callbackParam, data);
            }
            t.trigger('register:success');
          }
        })
      }
    });
    //t.loginModel.set('smsCode', identifyingCode);
    //t.loginModel.set('mobile', saveData.mobile);
    //t.loginModel.set('appId', '427A0F1E');
    //t.loginModel.set('appSecret', 'e5a2d89d9dcf74cdffa3bd59a3440123a0284695');
  },
  btnClick(e){
    this.trigger('btn:click', e);
  },
  btnCloseClick(e){
    this.trigger(consts.view_event.destroy);
  },
  initialize(options){
    let t = this;
    if (options) {
      t.callback = options.callback;
      t.callbackParam = options.callbackParam
    }
    t.data = {};
    t.sendMsgModel = new SendMsgModel({
      mobile: ''
    });
    t.loginModel = new LoginModel({
      mobile: '',
      smsCode: ''
    });
    t.telModel = new TelModel();
    t.indentifyModel = new IndentifyModel();
    t.telInput = new InputBoxView({
      model: t.telModel
    }, {
      fieldName: 'tel-input',
      text: '',
      placeholder: '手机号',
      readonly: false,
      maxLength: 13
    });
    t.listenTo(t.telModel, 'change', function (model) {
      t.indentifyModel.set({
        'phoneNumber': t.telModel.get('val')
      });
    });
    t.identifyingCodeBox = new IdentifyingCodeBoxView({
      model: t.indentifyModel
    });
    t.listenTo(t.identifyingCodeBox, 'send', t.indentifyCodeSend);
    t.listenTo(t.identifyingCodeBox, 'error:invalid:phoneNumber', t.errorInvalidPhoneNumber);
    t.on(consts.view_event.destroy, t.destroy);
  },
  errorInvalidPhoneNumber(){
    eventChannel.request(consts.radio.event_dialog_error, {
      code: 'E200011',
      msg: '请输入有效的手机号码!'
    });
  },
  indentifyCodeSend(phoneNumber){
    let t = this;
    if (t.sendMsgModel) {
      let SendMsgModel = Backbone.Model.extend({
        url: api.getUrl(api.user.uc.smsCode, api.user.uc.contextPath) +
        '?mobile=' + phoneNumber + '&smsType=10000&appId=' + config.uc.appId,
        defaults: {
          smsType: '10000'
        }
      });
      t.sendMsgModel = new SendMsgModel();
      t.sendMsgModel.fetch({
        success: function () {
          t.sendMsgModel.set('mobile', phoneNumber);
        },
        error: function () {
          t.identifyingCodeBox.trigger('counter:reset');
        }
      });
    }
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template, {
      data: t.data
    }));
    t.$('.tel').html(t.telInput.render().el);
    t.$('.valid').html(t.identifyingCodeBox.render().el);
    t.trigger('regist:item:shown');
    return t;
  },
  destroy(){
    let t = this;
    $('.header').show();
    if (t.identifyingCodeBox) {
      t.identifyingCodeBox.trigger(consts.view_event.destroy);
    }
    this.remove();
  }
});
