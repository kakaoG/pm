/**
 * 头
 **/
import Backbone from 'backbone'
import InputTpl from '../template/input-box.hbs'

import StringUtil from '../../util/string'

var LayoutView = Backbone.View.extend({
  events: {
    'input input': 'textInput',
    'click .label-del': 'labelDel'
  },
  textInput(e){
    let t = this;
    if(t.model) {
      t.model.set('val', e.currentTarget.value);
    }
  },
  valueChange(value){
    
  },
  //
  initialize: function (options, config, events) {
    var t = this;
    if(!t.model) {
      t.model = new Backbone.Model({
        val: ''
      });
    }
    t.listenTo(t.model, 'change:val', t.valueChange);
    t.config = config || {};
    t.disable = t.config.disable;
    t.events = events;
    t.initEvents();
    t.hasError = false;
  },
  render: function () {
    var t = this;
    t.$current = t.$el.html(tpl(InputTpl(), {
      data: t.config
    })).find('.' + t.config.fieldName);
    this.input = this.$('input');
    this.labelDel = this.$('.label-del')
    t.$labelDel = t.$current.find('.label-del');
    t.$labelWarn = t.$current.find('.label-warn');
    //t.$labelDel.hide();
    //t.$labelWarn.hide();
    t.$input = t.$current.find('input');
    if(t.config.maxLength) {
      t.$input.attr('maxlength', t.config.maxLength);
    }
    if (t.config.readonly) {
      t.setReadOnly(true);
    } else {
      t.$current.find('input').on('focus input', function (e) {
        var $this = $(this);
        if (t.hasError) {
          t.$labelWarn.hide();
          t.$input.attr('placeholder', '');
          t.hasError = false;
        }
        if ($this.val().length == 0) {
          t.$labelDel.hide();
        } else {
          t.$labelDel.show();
        }
      }).on('blur', function (e) {
        let val = t.model.get('val');
        if(val && val.length == 0) {
          setTimeout(function () {
            t.$labelDel.hide();
          }, 50);
        }
        t.trigger('blur', t.model);
      });
      // t.$labelDel.on('click', function () {
      //   t.$current.find('input').val('');
      //   t.$labelDel.hide();
      // });
    }
    return t;
  },
  initEvents: function () {
    var t = this;
    if (t.events && t.events.Keyup) {
      t.$el.find('.' + t.config.fieldName).off('keyup');
      t.$el.find('.' + t.config.fieldName).on('keyup', function (e) {
        if ($(e.currentTarget).hasClass(t.config.fieldName) && !t.disable) {
          t.events.Keyup(e);
        }
      });
    }
  },
  labelDel: function() {
    this.input.val("");
    this.labelDel.hide();
  },
  getValue: function () {
    var t = this;
    var input = t.$('input');
    return input.val();
  },
  setValue: function (value) {
    var t = this;
    var container = t.$el.find('.' + t.config.fieldName);
    if (container) {
      var input = container.find('input');
      input.val(value);
    }
  },
  setReadOnly: function (value) {
    var t = this;
    var container = t.$el.find('.' + t.config.fieldName);
    if (container) {
      var input = container.find('input');
      if (value) {
        input.attr('readonly', 'readonly');
      } else {
        input.removeAttr('readonly');
      }

    }
  },
  focus: function () {
    var t = this;
    var container = t.$el.find('.' + t.config.fieldName);
    if (container) {
      var input = container.find('input');
      input.focus();
    }
  },
  append: function (value) {
    var t = this;
    var container = t.$el.find('.' + t.config.fieldName);
    if (container) {
      var input = container.find('input');
      var input_value = input.val();
      if (input_value) {
        input_value = input_value + value;
      } else {
        input_value = value;
      }
      input.val(input_value);
    }
  },
  //是否为空
  isVerify: function () {
    var t = this;
    var v = t.getValue();
    return StringUtil.isVerify(v);
  },
  //是否是手机号
  isPhone: function () {
    var t = this;
    var v = t.getValue();
    return StringUtil.isPhone(v);
  },
  setErrorByPlaceholder: function (msg) {
    if (!msg) {
      return;
    }
    var t = this;
    t.$input.attr('placeholder', msg);
    t.$labelWarn.show();
    t.hasError = true;
  }
});
export default LayoutView;