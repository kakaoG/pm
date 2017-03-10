/**
 * 电话
 **/
import Backbone from 'backbone'

import PhoneTpl from '../template/phone.tpl'

var LayoutView = Backbone.View.extend({
  tagName: "span",
  initialize(options, config) {
      var t = this;
      t.config = {
        phone: ''
      };
      _.extend(t.config, config);
      t.render();
    },
    render(){
    var t = this;
    //$('phone').text(this.config.phone);
    t.$el.html(tpl(PhoneTpl(), {
      data: {
        phone: this.config.phone
      }
    }));
      return t;
  },
  setPhone(phone) {
    var t = this;
    t.config.phone = phone;
    t.render();
  },
  getPhone(phone){
    return this.config.phone;
  }
})
export default LayoutView;
