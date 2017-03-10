/**
 * 商场首页
 * @returns {*[]}
 */
module.exports = function () {
  return [
    {
      "id": "1",
      "message": "",
      "code": 0,
      "dataMap": {
        "currentRecordsNum": 0,
        "totalPages": 1,
        "totalElemenets": 3,
        "pageSize": 20,
        // 优惠券列表
        "coupons": [
          {
            "id": "1",
            // 状态: 1是可用,0是不可用
            "status": "1",
            "title": "满1000减100",
            "condition": "电笔2件可用",
            // 有效期时间
            "expiryDate": {
              "from": 1469592070360,
              "to": 1469593070360
            },
            "shop": {
              "shopName": "核心平台",
              "codeUrl": "#",
              "num": "1234534"
            }
          },
          {
            "id": "2",
            // 状态: 1是可用,0是不可用
            "status": "0",
            "title": "满1000减100",
            "condition": "电笔2件可用",
            // 有效期时间
            "expiryDate": {
              "from": 1469592070360,
              "to": 1469593070360
            },
            "shop": {
              "shopName": "核心平台0",
              "codeUrl": "#",
              "num": "1234534"
            }
          },
          {
            "id": "3",
            // 状态: 1是可用,0是不可用
            "status": "2",
            "title": "满1000减100",
            "condition": "电笔2件可用",
            // 有效期时间
            "expiryDate": {
              "from": 1469592070360,
              "to": 1469593070360
            },
            "shop": {
              "shopName": "核心平台2",
              "codeUrl": "#",
              "num": "1234534"
            }
          },
        ]
      }
    }
  ]
}