var Backbone = require('backbone');
var _ = require('lodash');

module.exports = function (api) {
  api.route('/api/article/detail/articleId')
    .get(function (req, res) {
      var fixture = require('./detail/' + req.params.articleId);
      var model = new Backbone.Model(fixture);
      res.json(model);
    });
};
