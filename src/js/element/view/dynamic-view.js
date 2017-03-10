import Backbone from 'backbone'

const View = Backbone.View.extend({
  className: 'dynamic-view',
  initialize(options){
    let t = this;
    options = options || {};
    t.template = options.template;
    t.events = options.events;
    t.methods = options.methods;
    _.extend(t, t.methods);
    if (t.model) {
      t.listenTo(t.model, 'change', t.render);
    }
  },
  render(){
    let t = this;
    t.$el.html(tpl(t.template, t.model.toJSON()));
    t.delegateEvents(t.events || {});
    return t;
  }
});

export default View;