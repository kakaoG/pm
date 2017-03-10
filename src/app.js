import plugins from './plugins'

window.$nvwa = {
  version: "1.0.0"
};
window.$nvwa.app = {

};

//静态资源使用序列化的图片
window.resource = {
  image: './img',
  upload: './upload'
};
/*window.resource.image*/

import Index from './js/index'

Index.init();