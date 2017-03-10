/**
 * 验证码按钮
 **/
import  Backbone from 'backbone'
import IdentifyCodeBoxBtnTpl from '../template/identify-code-box-btn.tpl'
import consts from '../../util/consts'

let CounterModel = Backbone.Model.extend({
  defaults: {
    // 倒计时总时长, 秒
    countDown: 30,
    // 计数
    counter: -1,
  }
});
let model = new CounterModel;
const LayoutView = Backbone.View.extend({
  template: tpl(IdentifyCodeBoxBtnTpl()),
  events: {
    'click .text': 'identifyingCodeSend'
  },
  //
  initialize: function (options, config, events) {
    var t = this;
    // 倒计时总时长, 秒
    var countDown = config.countDown || 30;
    model.set('countDown', countDown);
    t.listenTo(model, 'change:counter', t.render);
    t.on('counter:reset', t.reset);
    t.on('start', t.getIndentifyCode);
    model.set('counter', 0);
    t.render();
    t.on(consts.view_event.destroy, t.destroy);
  },
  identifyingCodeSend: function (e) {
    e.stopPropagation();
    this.trigger('before:send');
  },
  reset: function () {
    this.reset = true;
    model.set('counter', 0);
  },
  render: function () {
    var t = this;
    t.$el.html(t.template({
      data: model.toJSON()
    }));
    return t;
  },
  getIndentifyCode: function () {
    var t = this;
    var counter = model.get('counter');
    var countDown = model.get('countDown');
    if (counter > 0) {
      return;
    } else {
      t.trigger('send');
    }
    // 倒计时
    model.set('counter', counter += 1);
    t.intervalHandler = setInterval(function () {
      if (t.reset == true) {
        clearInterval(t.intervalHandler);
        model.set('counter', 0);
        return;
      }
      counter += 1;
      if (countDown - counter <= 0) {
        clearInterval(t.intervalHandler);
        counter = 0;
      }
      model.set('counter', counter);
    }, 1000);
  },
  destroy(){
    let t = this;
    if(t.intervalHandler != undefined) {
      clearInterval(t.intervalHandler);
    }
    t.remove();
  }
});
export default LayoutView;