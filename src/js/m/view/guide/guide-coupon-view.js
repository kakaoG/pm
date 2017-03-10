
import Backbone from 'backbone'

import guideCouponViewTpl from '../../template/guide/guide-coupon-view.tpl'
import SlideContainerDefaultItemView from '../../../element/view/slide-container-default-item-view'
import consts from '../../../util/consts'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
let Model = Backbone.Model.extend({});

const LayoutView = Backbone.View.extend({
	events:{
		'click': 'showDetailClick'
	},
	className: 'guide-coupon-view',
	template: guideCouponViewTpl(),
	initialize(){
		var t = this;
		t.model = new Model();
	},
	showDetailClick(){
		let slideContainerDefaultItemView = new SlideContainerDefaultItemView({
			title: '领取店内优惠券',
			content: '请到APP中查看',
			btnText: '立即下载'
		});
		this.listenTo(slideContainerDefaultItemView, 'btn:click', this.download);
		this.slideContainerView = eventChannel.request(consts.radio.event_dialog,
			slideContainerDefaultItemView);
	},
	download(){
		eventChannel.request(consts.radio.event_download);
	},
	render() {
		var t = this;
		  t.$el.html(t.template);
		return t
	}
});

export default LayoutView;