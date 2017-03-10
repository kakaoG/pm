

var storage = {
  // 是否在隐私模式中
  isLocalStorageSupported: function () {
    var testKey = 'test',
      storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  // 设值， 先写localStorage, 再写 window.quckpay
  set: function (key, value) {
    try {
      if (localStorage && localStorage.setItem && (typeof(localStorage.setItem) == 'function')) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      // 6-9 隐私模式需求
      // 写内存变量
      if (window.quickpay) {
        window.quickpay[key] = value;
      }
    }
  },

  // 取值，先从localStorage中读取，再读取 window.quickpay
  get: function (key) {
    var self = this;
    var value;

    try {
      if (localStorage && localStorage.getItem && (typeof(localStorage.getItem) == 'function')) {
        value = localStorage.getItem(key);
      }

      // 6-9 隐私模式新需求
      // 尝试从内存变量中取数据
      if (window.quickpay && window.quickpay[key]) {
        value = window.quickpay[key];
      }

      if (!self.isLocalStorageSupported()) {
        // 如果仍然为空就跳到第一页
        if (!value) {
          router.navigate('home', {
            trigger: true
          });
        }
      }
    } catch (e) {
      console.log(e);
    }

    return value;
  },

  // 仅判断是否有key-value
  has: function (key) {
    var self = this;
    var value;

    try {
      if (localStorage && localStorage.getItem && (typeof(localStorage.getItem) == 'function')) {
        value = localStorage.getItem(key);
      }

      // 6-9 隐私模式新需求
      // 尝试从内存变量中取数据
      if (window.quickpay && window.quickpay[key]) {
        value = window.quickpay[key];
      }

      if (!value) {
        return false;
      } else {
        return true;
      }

    } catch (e) {
      return false;
    }
  },
  //session操作
  session: {
    set: function (key, value) {
      if (_.isObject(value)) {
        value = JSON.stringify(value);
      }
      sessionStorage.setItem(key, value);
    },
    get: function (key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (e) {
        return sessionStorage.getItem(key);
      }
    }
  },
  local: {
    set: function (key, value) {
      if (_.isObject(value)) {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    },
    get: function (key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return localStorage.getItem(key);
      }
    }
  }
};
export default storage;