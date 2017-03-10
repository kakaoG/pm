/**
 * 头
 **/
import Backbone from 'backbone'
import IdentifyingCodeBoxTpl from '../template/identify-code-box.tpl'
import IdentifyingCodeBoxBtnView from './identify-code-box-btn'
import InputBoxView from './input-box'

import consts from '../../util/consts'
import StringUtil from '../../util/string'

let eventChannel = Backbone.Radio.channel(consts.radio.event);
const LayoutView = Backbone.View.extend({
  //
  initialize: function (options, config, events) {
    var t = this;
    this.config = config || {};
    t.listenTo(this, 'counter:reset', t.reset);
    t.indentify_input = new InputBoxView({
    }, {
      fieldName: 'indentify-input',
      text: '',
      placeholder: '请输入验证码',
      readonly: false,
      maxLength: 6
    });
    t.listenTo(t.indentify_input, 'all', function (event, model) {
      t.trigger(event, model);
    });
    t.indentify_code_box_btn = new IdentifyingCodeBoxBtnView({
      }, {
        countDown: 120
      });
    t.listenTo(t.indentify_code_box_btn, 'before:send', t.beforeSend);
    //t.initEvents();
    t.on(consts.view_event.destroy, t.destroy);
  },
  beforeSend(){
    // 获取手机号码
    let t = this;
    let phoneNumber = '';
    if(t.model) {
      phoneNumber = t.model.get('phoneNumber');
    }
    if(!StringUtil.isPhone(phoneNumber)) {
      t.trigger('error:invalid:phoneNumber');
      return;
    }
    this.indentify_code_box_btn.trigger('start');
  },
  reset: function () {
    this.indentify_code_box_btn.trigger('counter:reset');
  },
  identifyingCodeSend: function () {
    this.trigger('send', this.model.get('phoneNumber'), this.getValue());
  },
  render: function () {
    var t = this;
    t.$el.html(tpl(IdentifyingCodeBoxTpl(), {
      data: t.config
    }));
    t.$('.indentify-input-box').html(t.indentify_input.render().el);
    t.$('.indentify-button').html(t.indentify_code_box_btn.render().el);
    t.listenTo(t.indentify_code_box_btn, 'send', t.identifyingCodeSend);
    t.$('.text').show();
    return t;
  },
  getValue: function () {
    var t = this;
    var retVal = '';
    if (t.indentify_input) {
      retVal = t.indentify_input.getValue();
    }
    return retVal;
  },
  //是否为空
  isVerify: function () {
    return this.getValue() ? true : false;
  },
  destroy(){
    let t = this;
    if(t.indentify_code_box_btn) {
      t.indentify_code_box_btn.trigger(consts.view_event.destroy);
    }
    t.remove();
  }
});
export default LayoutView;