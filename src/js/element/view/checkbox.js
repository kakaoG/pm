/**
 * Checkbox组件
 **/
import Backbone from 'backbone'

import CheckboxTpl from '../template/checkbox.tpl'

var CheckModel = Backbone.Model.extend({
    defaults: {
        checked: false
    }
});
var chkModel = new CheckModel();

var LayoutView = Backbone.View.extend({
    className: 'checkbox',
    tagName: 'div',
    model: chkModel,
    events: {
        'click .chk-icon': 'iconOnClick'
    },
    //
    initialize: function(options, config, events) {
        var t = this;
        t.config = {
            _name: '_name_' + _.uniqueId(),
            _id: '_id_' + _.uniqueId(),
            iconClass: 'icon-dianpingxz'
        };
        _.extend(t.config, config);
        t.disable = t.config.disable;
        //t.events = events;
        t.extEvents = events;
        t.render();
        t.initEvents();
    },
    render: function() {
        var t = this;
        t.$el.html(tpl(CheckboxTpl(), {
            data: t.config
        }));
        t.$input = t.$('input');
    },
    initEvents: function() {
        var t = this;
        t.listenTo(t.model, 'change:checked', t.change);
    },
    change: function (model, value) {
        var t = this;
        if(value) {
            // 已选中
            t.config.iconClass = 'icon-dianpingxz1';
        } else {
            // 未选中
            t.config.iconClass = 'icon-dianpingxz';
        }
        t.render();
        if(t.extEvents) {
            if(t.extEvents.change && _.isFunction(t.extEvents.change)) {
                _.invoke([t.extEvents], 'change', value);
            }
        }
    },
    iconOnClick: function (e) {
        var val = !this.model.get('checked');
        this.model.set({
            checked: val
        })

    },
    isChecked: function() {
        return this.model.get('checked');
    },
    setDisable: function(value) {
        var t = this;
        t.disable = value;
        if (value) {
            t.$el.find('.' + t.config.fieldName).find('.text').addClass('disable');
        } else {
            t.$el.find('.' + t.config.fieldName).find('.text').removeClass('disable');
        }
    }
});
export default LayoutView;