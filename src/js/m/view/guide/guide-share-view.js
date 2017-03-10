
import Backbone from 'backbone'

import guideShareViewTpl from '../../template/guide/guide-share-view.tpl'

let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
	className: 'guide-share-view',
	template: guideShareViewTpl(),
	initialize(){
		var t = this;
		t.model = new Model();
		t.listenTo(t.model, 'change', t.render);
	},
	render() {
		var t = this;
      	var data = _.extend({
      		shareList: []
    	}, t.model.toJSON());
		  t.$el.html(tpl(t.template,
        {data:data}));
		return t
	},
	setItems (item){
	    var t = this;
	    t.model.set(item);
  	}
});

export default LayoutView;