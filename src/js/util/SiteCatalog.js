import config from '../core/config'
import storage from './storage'
import uuid from 'node-uuid'
import role from './role'
import Log from '../util/Log'

class SiteCatalog {
  constructor(elem) {
    this.key_umid = 'u_mid';
    if (!window.mid) {
      this.init();
    }
    this.elemOptions = this.getElemDataset(elem);
  }

  init() {
    let t = this;
    // 每次浏览器打开生成一个id
    let mid = storage.session.get(t.key_umid);
    window.mid = mid;
    if (!mid) {
      storage.session.set(t.key_umid, uuid.v4());
    }
  }
  getUMid() {
    return storage.session.get(this.key_umid);
  }

  // 获取元素上的配置
  getElemDataset(elem) {
    let props = {};
    if (!elem || !elem.dataset) {
      return props;
    }
    let dataset = elem.dataset;
    let keys = _.keys(dataset);
    _.each(keys, function (item) {
      if (/^site_/.test(item)) {
        let key = item.replace('site_', '');
        props[key] = dataset[item];
      }
    });
    return props;
  }

  preInitOptions(options = {}) {
    // 主站点
    options['p_domain'] = 'mmall.com';
    // 地址
    options['p_url'] = location.href;
    // 设置用户信息
    let token = role.getOpenId();
    options['u_id'] = token;
    options['u_mid'] = this.getUMid();
    options['u_guid'] = options['u_id'];
    // p_id
    options['p_id'] = token;
    // p_title
    options['p_title'] = document.title;
    // r_url
    options['r_url'] = config.referrer;

  }

  // 获取当前画面相关信息
  getCurrentCatalog() {
    let defaultConfig = config.site_catalog[router.current.id];
    if(!defaultConfig) {
      Log.log('默认配置匹配不成功 router.current.id:', router.current.id)
    }
    return defaultConfig;
  }

  valid(extOptions) {
    let ret = true;
    if (_.isEmpty(extOptions)) {
      ret = false;
    } else if (!extOptions.page) {
      ret = false;
    }

    return ret;
  }

  // 获取当前画面相关信息
  getCatalogOptions(actionName, page = '') {
    let actionCostTimeOption = {};
    let curCatalog = this.getCurrentCatalog();
    if (curCatalog) {
      // 获取配置信息
      let actionCostTimeOptions = curCatalog[actionName];
      if (actionCostTimeOptions) {
        // 仅取得一条
        if (actionCostTimeOptions.page) {
          actionCostTimeOption = actionCostTimeOptions;
        } else {
          // 取得多条
          if (this.elemOptions) {
            page = page || this.elemOptions.page;
          }
          actionCostTimeOption = _.find(actionCostTimeOptions, function (item) {
            return item.page == page;
          });
        }
      }
    }
    if (!actionCostTimeOption) {
      Log.log('埋点-错误-基础信息', this.elemOptions);
      return {};
    }
    // 补充常规信息
    this.preInitOptions(actionCostTimeOption);
    // 设置元素配置信息
    _.extend(actionCostTimeOption, this.elemOptions);
    Log.log('埋点-基本信息', actionCostTimeOption);
    return actionCostTimeOption;
  }

  // 取得参数信息
  getOptions(extOptions = {}, actionName) {
    let options = this.getCatalogOptions(actionName, extOptions.page);
    // 补充扩展信息
    _.extend(options, extOptions);
    return options;
  }

  // PV/UV埋点
  pageAndUserView(extOptions, actionName = 'pageAndUserView') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('PV/UV埋点 pageAndUserView', options);
      window.data && data.pageAndUserView(options);
    }
  }

  // 功能数据埋点
  clickEvent(extOptions, actionName = 'clickEvent') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('功能数据埋点 clickEvent', options);
      window.data && data.clickEvent(options);
    }
  }

  // 页面停留时间埋点
  pageViewTime(extOptions, actionName = 'pageViewTime') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('页面停留时间埋点 pageViewTime', options);
      window.data && data.pageViewTime(options);
    }
  }

  // 浏览屏数埋点
  viewScreenNumber(extOptions, actionName = 'viewScreenNumber') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('浏览屏数埋点 viewScreenNumber', options);
      window.data && data.viewScreenNumber(options);
    }
  }

  // 曝光数据埋点
  exposureData(extOptions, actionName = 'exposureData') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('曝光数据埋点 exposureData', options);
      window.data && data.exposureData(options);
    }
  }

  // 行为消耗埋点
  actionCostTime(extOptions, actionName = 'actionCostTime') {
    let options = this.getOptions(extOptions, actionName);
    if (this.valid(options)) {
      // 访问日志
      Log.log('行为消耗埋点 actionCostTime', options);
      window.data && data.actionCostTime(options);
    }
  }
}
let dataPre = 'data-site_';
let Util = {
  // 输出site参数
  output(options){
    if (!options) {
      return '';
    }
    let keys = _.keys(options);
    let o = ' ';
    _.each(keys, function (item) {
      o += dataPre + item + '="' + options[item] + '" ';
    });
    return o;
  }
}
window.SiteCatalogUtil = Util;
export default SiteCatalog;