var Backbone = require('backbone');

module.exports = function (api) {
  api.route('/api/m/product/detail/:id')
    .get(function (req, res) {
      var fixture = require('./fixture');
      var collection = new Backbone.Collection(fixture());
      var model = collection.get(1);
      res.json(model);
    });
};
