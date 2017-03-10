/**
 * TAB Item 组件
 **/
import Backbone from 'backbone'

import Tpl from './select-item-view.tpl'

const LayoutView = Backbone.View.extend({
    tagName: 'option',
    template: Tpl(),
    events: {
        'click': 'tabItemClick'
    },
    tabItemClick(){
        this.trigger('item:click', this.model);
    },
    initialize () {
        var t = this;
        t.on('destroy', t.destroy);
        t.listenTo(t.model, 'change', t.render);
    },
    render() {
        var t = this;
        if (t.model) {
            let data = t.model.toJSON();
            t.$el.html(tpl(Tpl(), {
                data: data
            }));
            if (data.active) {
                t.$el.addClass('active');
            } else {
                t.$el.removeClass('active');
            }
        }
        return t;
    },
    destroy () {
        this.remove()
    }
});
export default LayoutView;