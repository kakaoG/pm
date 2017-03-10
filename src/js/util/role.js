import config from '../core/config'
import consts from '../util/consts'
import storage from '../util/storage'
let key_user_info = 'key_user_info';
const Role = {
  isLogin(configParam){
    if (!config.dummy_user && configParam && configParam.role) {
      if (!this.getToken()) {
        return false;
      }
    }
    return true;
  },
  getToken(){
    return $nvwa.cookie.getCookie(consts.global_keys.token);
  },
  getOpenId(){
    let userInfo = this.get();
    if(userInfo){
      return userInfo.openid;
    } else{
      return '';
    }
  },
  getPhoneNumber(){
    let userInfo = this.get();
    if(userInfo) {
      return userInfo.mobile;
    } else {
      return '';
    }
  },
  getOpenId(){
    let userInfo = this.get();
    if(userInfo) {
    return userInfo.openid;
    } else {
      return '';
    }
  },
  save(userInfo){
    //  "birthday": "",
    //  "lastLoginAt": 1475761787000,
    //  "vipStatus": 1,
    //  "status": 1,
    //  "sessionid": "62648a2c-0a5b-4923-b986-8f960d0d87fc",
    //  "avatar": "http://wx.qlogo.cn/mmopen/sTibaLH1utuDtaAtiaagJ1Jvz8BZIHBf9p1VL7fjD0wMQDPDPrRbcQYoNrsR31sIRRaVwuMZU0tqER9mDpt1TcJO8HAZZeD8wD/0",
    //  "id": 11392495,
    //  "lastLoginIp": "172.16.12.184",
    //  "username": "hm_001a7549",
    //  "email": "",
    //  "nickName": "18314892077",
    //  "birthdayTime": "0",
    //  "name": "",
    //  "isUpdateUsername": null,
    //  "gender": -1,
    //  "openid": "344079b8-51ef-42e5-b693-6aa8b2656497",
    //  "vipCode": "",
    //  "mobile": "18314892077"
    storage.session.set(key_user_info, userInfo);
  },
  get(){
    return storage.session.get(key_user_info);
  }
}

export default Role;