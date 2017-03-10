var Backbone = require('backbone');
var URL = require('url');

module.exports = function (api) {
  //user/cupon/pageNo/1/pageSize/10?status=1
  api.route('/api/coupon/user/cupon/pageNo/1/pageSize/100')
    .get(function (req, res) {
      let status = URL.parse(req.url, true).query.status;
      var fixture = require('./fixture-me');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(status);
      res.json(model);
    });
  api.route('/api/m/m/coupon/detail')
    .get(function (req, res) {
      var fixture = require('./fixture-detail');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
};
