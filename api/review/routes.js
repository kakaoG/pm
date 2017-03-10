var Backbone = require('backbone');
var _ = require('lodash');
var likedNumber = 1;
module.exports = function (api) {
  api.route('/api/m/review/')
    .get(function (req, res) {
      res.json({
        code:0,
        message: '',
        path: req.url
      })
    });
  api.route('/api/m/review/add')
    .put(function (req, res) {
      res.json({
        code: 200,
        message: '',
        dataMap: {
          likedNumber: likedNumber++
        }
      });
    });
  api.route('/api/m/review/list/')
    .post(function (req, res) {
      var fixture = require('./fixture-my-review');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/review/label/:type')
    .get(function (req, res) {
      var fixture = require('./fixture-label');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
  api.route('/api/m/review/praise/:id')
    .put(function (req, res) {
      res.json({
        "ok": true,
        "message": "响应成功",
        "code": 200,
        "dataMap": {
          "likedNumber": likedNumber++
        }
      });
    });
  api.route('/api/m/review/upload')
    .put(function (req, res) {
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      //res.json(model);
      res.json({
        code: 0,
        message: '',
        dataMap: {
          url: '#34324234234'
        }
      });
    })
    .post(function (req, res) {
      //var fixture = require('./fixture');
      //var collection = new Backbone.Collection(fixture());
      //var model = collection.get(req.params.id);
      //res.json(model);
      res.json({
        code: 0,
        message: '',
        dataMap: {
          url: '#34324234234'
        }
      });
    });

  api.route('/api/m/review/:id')
    .get(function (req, res) {
      var fixture = require('./fixture-review-detail');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(req.params.id);
      res.json(model);
    })
    .delete(function (req, res) {
      res.json({
        code: 0,
        message: '',
        dataMap: req.body
      });
    });
};
