/**
 *
 * 个人中心
 **/
import Backbone from 'backbone'
import nprogress from 'nprogress'
import PersonalTpl from '../template/personal.tpl'
import AuthApi from  '../../api/auth'
import UserApi from '../../api/user'
import InputBox from '../../element/view/input-box'
import Header from '../../element/view/header'
import IdentifyingCodeBox from '../../element/view/identify-code-box'
import PasswordBox from '../../element/view/password-box'
import HxView from '../../components/hx-view'
import consts from '../../util/consts'
import api from '../../api/api'
var eventChannel = Backbone.Radio.channel(consts.radio.event);
import config from '../../core/config'

let Model = Backbone.Model.extend({
  url: api.getUrl(api.user.uc.profile, api.user.uc.contextPath) + '?appId=' + config.uc.appId,
  getUserInfo(){
    return this.toJSON()
  }
});

let LogoutModel = Backbone.Model.extend({
  url: api.getUrl(api.user.uc.signout, api.user.uc.contextPath) + '?appId=' + config.uc.appId
});

const LayoutView = Backbone.View.extend({
  events: {
    'click .exit': 'exitOnClick'
  },
  exitOnClick: function (e) {
    var t = this;
    t.logoutModel.save(null, {
      success: function () {
        $nvwa.cookie.setCookie(consts.global_keys.token, '');
        history.back();
      }
    });
  },
  //
  initialize: function (options, config) {
    var t = this;
    t.headerView = new Header({}, {
      title: '个人中心'
    });
    $('.header').html(t.headerView.render().el);
    t.model = new Model();
    t.logoutModel = new LogoutModel();
    t.listenTo(t.model, 'change', t.render);
    t.listenTo(t.logoutModel, 'change', t.render);
  },
  render: function () {
    var t = this;
    t.personalData = t.model.getUserInfo() || {};
    t.$el.html(tpl(PersonalTpl(), {
      psnData: t.personalData
    }));
    eventChannel.request(consts.radio.event_rebuild_image_path);
    nprogress.done();
    return t;
  },
  fetch(){
    let t = this;
    t.model.fetch();
  },
});

export default LayoutView;