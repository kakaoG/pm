//处理公共http头的类
var HeaderUtil = {
  //获取所有的header
  getHeaders: function () {
    return this.dataMap;
  },
  //获取header的值
  getHeader: function (key) {
    return this.dataMap[key];
  },
  //设置header的值
  setHeader: function (key, value) {
    this.dataMap[key] = value;
  },
  dataMap: {}
}
export default HeaderUtil;