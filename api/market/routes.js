var Backbone = require('backbone');
var _ = require('lodash');

module.exports = function (api) {
  api.route('/api/m/market/brand/:marketId/:brandId')
    .get(function (req, res) {
      var fixture = require('./brand/' + req.params.marketId + '/' + req.params.brandId);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
  api.route('/api/m/market/detail/:marketId')
    .get(function (req, res) {
      var fixture = require('./detail/' + req.params.marketId);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
  api.route('/api/market/floor/:id')
    .get(function (req, res) {
      var fixture = require('./floor/' + req.params.id);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
  api.route('/api/market/floor/photo/:floorId/:id')
    .get(function (req, res) {
      var fixture = require('./photo/' + req.params.floorId + '_' + req.params.id);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
};
