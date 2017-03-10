var Backbone = require('backbone');

module.exports = function (api) {
  api.route('/api/m/shoppingMall/map/:id')
    .get(function (req, res) {
      console.log('/api/m/shoppingMall/map/:id')
      var fixture = require('./fixture-map');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get('1');
      res.json(model);
    });
  api.route('/api/m/shoppingMall/:id')
    .get(function (req, res) {
      console.log('/api/m/shoppingMall/:id')
      var fixture = require('./fixture');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(req.params.id);
      res.json(model);
    });
};
