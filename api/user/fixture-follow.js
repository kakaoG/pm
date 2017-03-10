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
        "totalElemenets": 3,
        // 关注列表
        "follows": [
          {
            "id": 1,
            // 被关注对象ID
            "targetId": "1",
            "type": {
              // 商场
              "code": 1,
              "name": "店铺",
            },
            "img": "/img/m/index/mall_ren6.jpg",
            "title":"红星真北商场",
            "address":"上海市普陀区怒江北路",
            "tel": "400-123-123"
          },
          {
            "id": 2,
            // 被关注对象ID
            "targetId": "1",
            "type": {
              // 商场
              "code": 1,
              "name": "店铺",
            },
            "img": "/img/m/index/mall_ren6.jpg",
            "title":"红星真北商场",
            "address":"上海市普陀区怒江北路",
            "tel": "400-123-123"
          },
          {
            "id": 3,
            // 被关注对象ID
            "targetId": "1",
            "type": {
              // 商场
              "code": 2,
              "name": "店铺",
            },
            "img": "/img/m/index/mall_ren6.jpg",
            "title":"千木轩家具",
            "tags": ["标签", "标签"],
            "class": ["沙发","餐桌"]
          }
        ],
      }
    }
  ]
}