

import Backbone from 'backbone'

import Tpl from './article-shop-view.tpl'
import PhoneView from '../../element/view/phone'


let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
  className: 'article-shop-view',
  template: Tpl(),
  initialize(){
    var t = this;
    t.model = new Model();
    t.phoneView = new PhoneView({}, {
        phone:'4008-123-123'
    });
    t.listenTo(t.model, 'change', t.render);
  },
  render() {
    var t = this;
    t.$el.html(tpl(t.template,
      {data:t.model.toJSON()}
    ));

    t.$('.phoneBox').html(t.phoneView.render().el);
    return t
  },
  setItems (item){
    var t = this;
    t.model.set(item);
  }
});

export default LayoutView;
