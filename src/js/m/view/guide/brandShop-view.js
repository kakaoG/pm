

import Backbone from 'backbone'

import brandShopViewTpl from '../../template/guide/brandShop-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
	className: 'brandShop-view',
	template: brandShopViewTpl(),
	initialize(){
		var t = this;
		t.model = new Model();
		t.listenTo(t.model, 'change', t.render);
	},
	render() {
		var t = this;
		  t.$el.html(tpl(t.template,
		  	{data:t.model.toJSON()}
		  	));
		return t
	},
	setItems (item){
	    var t = this;
	    t.model.set(item);
  	}
});

export default LayoutView;