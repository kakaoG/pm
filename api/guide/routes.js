var Backbone = require('backbone');
var _ = require('lodash');

module.exports = function (api) {
  api.route('/api/m/merchant/shopper/:guideId')
    .get(function (req, res) {
      var fixture = require('./detail/' + req.params.guideId);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
};
