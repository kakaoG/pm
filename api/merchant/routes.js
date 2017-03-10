var Backbone = require('backbone');
var _ = require('lodash');

module.exports = function (api) {
  api.route('/api/m/merchant/collection')
    .post(function (req, res) {
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      console.log(req.body)

      res.json({
        "code": "0"
      });
    });
  api.route('/api/m/merchant/reviewList/')
    .post(function (req, res) {
      var fixture = require('./fixture-review-list');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/merchant/album/:id')
    .get(function (req, res) {
      var fixture = require('./fixture-album');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(req.params.id);
      if (model) {
        res.json(model);
      } else {
        res.status(500).json({
          code: 500,
          message: '出错了'
        });
      }
    });
  api.route('/api/m/merchant/detail/:id')
    .get(function (req, res) {
      var fixture = require('./fixture');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(req.params.id);
      if (model) {
        res.json(model);
      } else {
        res.status(500).json({
          code: 500,
          message: '出错了'
        });
      }
    });
};
