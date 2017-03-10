import config from '../core/config'
import browsers from './browsers'
const Log = {
  log(...args){
    if(config.debug && browsers.weixin) {
      //alert(args.join(' '));
    } else if(config.debug) {
      console.log.apply(console, args);
    }
  },
  info(...args){
    if(config.debug && browsers.weixin) {
      //alert(args.join(' '));
    } else if(config.debug) {
      console.info.apply(console, args);
    }
  },
  warn(...args){
    if(config.debug && browsers.weixin) {
      //alert(args.join(' '));
    } else if(config.debug) {
      console.warn.apply(console, args);
    }
  }
}
export default Log;