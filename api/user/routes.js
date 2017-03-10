var Backbone = require('backbone');

module.exports = function (api) {
  api.route('/api/m/auth/')
    .post(function (req, res) {
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      res.json({
        "code": "0"
      });
    });
  api.route('/api/m/user')
    .get(function (req, res) {
      var fixture = require('./fixture-userinfo');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/user/auth')
    .post(function (req, res) {
      console.log(req.body);
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      res.json({
        "code": "0"
      });
    });
  api.route('/api/m/user/follow/')
    .get(function (req, res) {
      console.log(req.params);
      var fixture = require('./fixture-follow');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/user/shopping/')
    .get(function (req, res) {
      console.log(req.params);
      var fixture = require('./fixture-shopping-list');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    })
    .put(function (req, res) {
      res.json({
        code: 0,
        message: '',
        dataMap: {
          data: {
            ok:true
          }
        }
      });
    });

  api.route('/api/m/user/coupon/')
    .get(function (req, res) {
      console.log(req.params);
      var fixture = require('./fixture-coupon');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/user/commentList/')
    .post(function (req, res) {
      var fixture = require('./fixture-my-review');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/user/collection/:merchantId')
    .get(function (req, res) {
      console.log(req.params);
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      res.json({
        "code": "0"
      });
    });
};
