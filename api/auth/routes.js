var Backbone = require('backbone');

module.exports = function (api) {
  api.route('/api/m/auth/wx/get-signature/:url')
    .get(function (req, res) {
      res.json({
        "message": "响应成功",
        "code": 200,
        "dataMap": {
          "data": {
            "timestamp": "1471422599",
            "appId": "wxefbec73b5639a8f1",
            "nonceStr": "e6093ddc270e4f34961ed8e5e7d4e751",
            "signature": "0baa1dbb3330bd0a8e4d52694a4e746490e85069"
          }
        }
      });
    });
};
