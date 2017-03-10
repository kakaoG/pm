/**
 * Community 模块 API
 * M站-用户
 * @return {[type]} [description]
 */
define('js/api/user', ['js/util/http'], function(http, MockData) {
    var _basePath = '/API/user';
    var __debug = false;
    var CommunityApi = {
        initialize: function() {},
        _executeRequest: function(url, data, handler, isJsonp, method, async) {
            if (__debug) {
                if (MockData[url]) {
                    handler(MockData[url](url, data));
                } else {
                    console.warn('Fill mock data in mockdata.js!');
                }
            } else {
                http.request(url, data, handler, isJsonp, method, async);
            }
        },
        _executeResponse: function(response, success, error) {
            if (response && response.ok) {
                if (success) {
                    //return success function
                    success(response.dataMap);
                }
            } else {
                if (error) {
                    //return error function
                    error(response.code, response.message);
                }
            }
        },
        /**
         *
         */
        _myCollect: function (success, error) {
            success =  {
                data:[
                    {
                        imgUrl: "XXX",
                        id: 1,
                        score: 4.5,
                        name: '水星家纺店'
                    },
                    {
                        imgUrl: "XXX",
                        id: 1,
                        score: 4.5,
                        name: '水星家纺店'
                    },
                    {
                        imgUrl: "XXX",
                        id: 1,
                        score: 4.5,
                        name: '水星家纺店'
                    }
                ]
            }

            return success;

        }
    };
    return CommunityApi;
});