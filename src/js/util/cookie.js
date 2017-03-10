
var cookie = function () {
  window.$nvwa.cookie = {
    getCookie: function (c_name) {
      var value = document.cookie.match(new RegExp("(?:^| )" + encodeURIComponent(c_name) + "=([^;]*)(?:;|$)", "i"));
      return value ? decodeURIComponent(value[1]) : ""
    },
    setCookie: function (c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

  };
}

export default cookie;