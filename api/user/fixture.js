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
        "data": {
          "id": 2,
          "qrCode": "what",
          // 是否收藏
          "favorite": false,
          /*新增加字段*/
          // 商场广告位
          "marketBanner": [
            {
              "link": '#',
              "img": 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1NjJhMjk2MzhkIHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTU2MmEyOTYzOGQiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNzc3Ii8+PGc+PHRleHQgeD0iMzA4LjI5Njg3NSIgeT0iMjcwLjEiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+',
              "text": '广告1'
            },
            {
              "link": '#',
              "img": 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1NjJhMjk2MzhkIHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTU2MmEyOTYzOGQiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNzc3Ii8+PGc+PHRleHQgeD0iMzA4LjI5Njg3NSIgeT0iMjcwLjEiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+',
              "text": '广告2'
            },
            {
              "link": '#',
              "img": 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1NjJhMjk2MzhkIHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTU2MmEyOTYzOGQiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNzc3Ii8+PGc+PHRleHQgeD0iMzA4LjI5Njg3NSIgeT0iMjcwLjEiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+',
              "text": '广告3'
            },
            {
              "link": '#',
              "img": 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1NjJhMjk2MzhkIHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTU2MmEyOTYzOGQiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNzc3Ii8+PGc+PHRleHQgeD0iMzA4LjI5Njg3NSIgeT0iMjcwLjEiPkZpcnN0IHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+',
              "text": '广告4'
            },
          ],
          // 商场信息
          "marketInfo": {
            "id": "1",
            "code": "123223",
            "img": "#",
            "title": "红星美凯龙真北店",
            "score": "4.7",
            "address": "上海市普陀区怒江北路000号",
            "hasCoupon": false,
            // 商场各维度评分
            "marketDimensionScore": [
              {
                "average": 3,
                "labelCode": "label_market_goods",
                "text": "商品"
              },
              {
                "average": 2,
                "labelCode": "label_market_environmental",
                "text": "环境"
              },
              {
                "average": 4,
                "labelCode": "label_market_service",
                "text": "服务"
              }
            ],
            // 总分
            marketScore: 4
          },
          notice: [
            {
              "text": "公告:商场公告1/通知1---",
              "link": "#"
            },
            {
              "text": "公告:商场公告2/通知2---",
              "link": "#"
            },
          ],
          // 活动Banner版块
          "activityCircular": [
            {
              "code": "0001",
              "message": "双十一促销"
            }
          ],
          // 优惠券
          "coupon": {
            "text": "万元福利优惠券",
            "coupons": [
              {
                "id": "1",
                // 状态: 1是可用,0是不可用
                "status": "1",
                "title": "满1000减100",
                "condition": "电笔2件可用",
                "expiryDate": {
                  "from": 1469592070360,
                  "to": 1469593070360
                }
              },
              {
                "id": "2",
                // 状态: 1是可用,0是不可用
                "status": "1",
                "title": "满1000减100",
                "condition": "电笔2件可用",
                "expiryDate": {
                  "from": 1469592070360,
                  "to": 1469593070360
                }
              },
              {
                "id": "3",
                "title": "满1000减100",
                "condition": "电笔2件可用",
                "expiryDate": {
                  "from": 1469592070360,
                  "to": 1469593070360
                }
              },
            ]
          },
          // 特色场所
          "characteristicPlace": [
            {
              "id": "1",
              "img": "#",
              "link": "#",
              "text1": "公元2050馆",
              "text2": "[5楼]"
            },
            {
              "id": "2",
              "img": "#",
              "link": "#",
              "text1": "儿童馆",
              "text2": "[6楼]"
            },
            {
              "id": "3",
              "img": "#",
              "link": "#",
              "text1": "公元2050馆",
              "text2": "[7楼]"
            },
            {
              "id": "4",
              "img": "#",
              "link": "#",
              "text1": "儿童馆",
              "text2": "[8楼]"
            }
          ],
          // 独特体验
          "uniqueExperience": [
            {
              "id": "1",
              "img": "#",
              "link": "#",
              "text": "AngelaBaby同款沙发1",
            },
            {
              "id": "2",
              "img": "#",
              "link": "#",
              "text": "AngelaBaby同款沙发2",
            },
            {
              "id": "3",
              "img": "#",
              "link": "#",
              "text": "AngelaBaby同款沙发3",
            },
            {
              "id": "4",
              "img": "#",
              "link": "#",
              "text": "AngelaBaby同款沙发4",
            }
          ],
          // 金牌导购Top10
          "sellConductorTop10": [
            {
              "id": "1",
              "tag": {
                //类型需要和后端确定
                "type": "1",
                "text": "最帅导购"
              },
              "img": "#",
              "text": "美凯龙",
              "status": {
                "type": "online",
                "text": "在线"
              },
              "hasCoupon": true
            },
            {
              "id": "2",
              "tag": {
                "type": "2",
                "text": "最美导购"
              },
              "img": "#",
              "text": "导购A",
              "status": {
                "type": "living",
                "text": "直播中"
              },
              "hasCoupon": false
            },
            {
              "id": "3",
              "tag": {
                "type": "3",
                "text": "最萌导购"
              },
              "img": "#",
              "text": "导购C",
              "status": {
                "type": "online",
                "text": "在线"
              },
              "hasCoupon": true
            },
            {
              "id": "4",
              "tag": {
                "type": "4",
                "text": "最IN导购"
              },
              "img": "#",
              "text": "导购D",
              "status": {
                "type": "offline",
                "text": "已离线"
              },
              "hasCoupon": true
            },
          ],
          // 品牌推荐
          "brandRecommendation": [
            {
              "type": "1",
              "typeName": "建材",
              "brands": [
                {
                  "id": "1",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "2",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "3",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "4",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "5",
                  "img": "#",
                  "link": "#"
                },
              ]
            },
            {
              "type": "2",
              "typeName": "建材",
              "brands": [
                {
                  "id": "1",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "2",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "3",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "4",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "5",
                  "img": "#",
                  "link": "#"
                },
              ]
            },
            {
              "type": "3",
              "typeName": "其他",
              "brands": [
                {
                  "id": "1",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "2",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "3",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "4",
                  "img": "#",
                  "link": "#"
                },
                {
                  "id": "5",
                  "img": "#",
                  "link": "#"
                },
              ]
            },
          ],
          // 商品版块
          "goodsList": [
            {
              "id": "1",
              "title": "121113",
              "img": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNTU1OiMzMzMvdGV4dDpUaGlyZCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1NjJhMjk1NDI3IHRleHQgeyBmaWxsOiMzMzM7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTU2MmEyOTU0MjciPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNTU1Ii8+PGc+PHRleHQgeD0iMjk4LjMyMDMxMjUiIHk9IjI3MC4xIj5UaGlyZCBzbGlkZTwvdGV4dD48L2c+PC9nPjwvc3ZnPg==",
              "link": "#",
              "tag": "标签1"
            },
            {
              "id": "2",
              "title": "",
              "img": "#",
              "link": "#",
              "tag": "标签"
            },
            {
              "id": "3",
              "title": "",
              "img": "#",
              "link": "#",
              "tag": "标签"
            },
            {
              "id": "4",
              "title": "",
              "img": "#",
              "link": "#",
              "tag": "标签"
            },
            {
              "id": "5",
              "title": "",
              "img": "#",
              "link": "#",
              "tag": "标签"
            }
          ],
          // 商场服务
          "shoppingMallService": {
            "shopHours": {
              "from": 123,
              "to": 123,
              "text": "全年无休"
            },
            "complaintTel": "400-100-500",
            "address": "上海市真北路000号",
            "position": {
              // 精度
              "longitude": "121.500251",
              // 纬度
              "latitude": "31.244579",
            }
          },
          // 热门评价
          "reviewList": [
            {
              "currentPage": 1,
              "currentRecords": [
                {
                  "id": 1,
                  "createDate": "2016-05-25 13:36:43",
                  "comment": "不错，产品很好",
                  // 需要加密显示,e.g. qa***qq
                  "userId": "12345678",
                  "showData": false,
                  "nickName": "假名字",
                  "picture": "#",
                  "redstarReviewDetails": [],
                  "redstarReviewReplies": [
                    {
                      "id": "12",
                      "createDate": "12345678",
                      "replyId": "12",
                      "replyXingMing": "张三",
                      "reviewId": "1",
                      "content": "回复内容12"
                    },
                    {
                      "id": "13",
                      "replyId": "12",
                      "createDate": "12345678",
                      "replyXingMing": "李四",
                      "reviewId": "1",
                      "content": "回复内容13"
                    }
                  ],
                  "liked": false
                }
              ],
              "currentRecordsNum": 0,
              "totalPages": 1,
              "totalElemenets": 3,
              "pageSize": 20,
              "paginationDescribe": ""
            },
          ],
        }
      }
    }
  ]
}