/**
 * TAB组件
 *
 * model:
 *  label:
 **/
import Backbone from 'backbone'


import Tpl from './selects-view.tpl'
import SelItemView from './select-item-view'

let Model = Backbone.Model.extend({
    label: '',
    value: ''
});
let Collection = Backbone.Collection.extend({
    model: Model
});

const LayoutView = Backbone.View.extend({
    events:{
        'change .selects-view':'changeSel'
    },
    changeSel(e){
        let t = this;
        let data = $(e.currentTarget).find('option:selected').val()
        t.trigger('change:option:selected', data);
    },
    template: Tpl(),
    current: null,
    initialize () {
        var t = this;
        t.collection = new Collection();
        t.on('destroy', t.destroy);
        t.listenTo(t.collection, 'add', t.addOneView);
    },
    render() {
        var t = this;
        t.$el.html(tpl(Tpl(), {
            data: t.collection.toJSON()
        }));
        return t;
    },
    routeActive(){
        this.trigger('item:active', this.current.toJSON());
    },
    eventRoute(event, model){
        if(this.current != model && event == 'item:click') {
            this.current.set('active', false);
            this.current = model;
            this.current.set('active', true);
            this.routeActive();
            this.trigger.apply(this, [event, model.toJSON()]);
        }
    },
    addOneView (model){
        var t = this;
        let data = model.toJSON();
        t.$('.selects-view').append('<option value="'+data.value+'">'+data.label  +'</option>');
    },
    setItems (items, defaultIndex){
        var t = this;
        t.collection.add(items);
        if(defaultIndex == undefined) {
            defaultIndex = 0;
        }
        t.current = t.collection.models[defaultIndex];
        t.current.set('active', true);
        this.routeActive();
    },
    destroy () {
        var t = this;
        t.collection.remove(t.collection.models);
        t.remove()
    }
});
export default LayoutView;