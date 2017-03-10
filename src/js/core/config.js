const Config = {
  debug: true,
  img_root_path: '/',
  referrer: document.referrer,
  dummy_user: false,
  reviews: {
    // 点评上传图片数量
    image_upload_count: 9,
  },
  // 用户中心配置
  uc: {
    'appId': '427A0F1E',
    'appSecret': 'e5a2d89d9dcf74cdffa3bd59a3440123a0284695',
  },
  server: {
    context: '',
    image: 'http://img3.hxmklmall.cn'
  },
  download: {
    ios: 'https://itunes.apple.com/us/app/hong-xing-mei-kai-long-jia/id1149794926?l=zh&ls=1&mt=8',
    page: 'https://www.mmall.com/download.html',
    android: ''
  },
  site_catalog: {
    shopHomeView: {
      pageAndUserView: [
        {
          'service':'m.pvuv',//收集类型
          'page':'110.250.20.00.00.000.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//卖场
          'p_type':'page.shop.detail',//主页
          'p_title':'<%shop_name%>',//页面名字
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.pvuv',//收集类型
          'page':'110.250.65.00.00.000.10',//定值
          'p_domain':'mmall.com',//主站点
          'p_channel':'home',//卖场首页
          'p_type':'page.image.detail.shop',//主页
          'p_title':'<图片标题>',//页面名字
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%image_id%>',//
          'version':'sdk',//来源埋点
        }
      ],
      exposureData: [
        {
          'service':'m.expo',//收集类型
          'page':'110.250.20.40.12.021.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'shop',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_item':'part.products',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.250.01.40.12.021.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_item':'part.services',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.250.20.40.12.021.40',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_item':'part.guide',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.250.20.40.12.021.50',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_item':'part.images',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.250.20.40.12.021.60',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_item':'part.replys',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%shop_id%>',//
          'version':'sdk',//来源埋点
        }
      ],
      clickEvent: [
        {
          'service':'m.click',//收集类型
          'page':'110.250.01.40.11.010.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.prodcuts.one',//页面上的模块
          'p_action_id':'<%psg_id%>',//触发的视频ID
          'p_action_pos':'<%pos_in_list%>',//触发时所在的第几个块
          'p_action_total':'<%products_list_size%>',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.40.02.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.text.first',//页面上的模块
          'p_action_id':'<%video_id%>',//触发的视频ID
          'p_action_pos':'[1..]',//触发时所在的第几个块
          'p_action_total':'1',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.40.02.010.30',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.texts.one',//页面上的模块
          'p_action_id':'<%text_id%>',//触发的视频ID
          'p_action_pos':'[1..5]',//触发时所在的第几个块
          'p_action_total':'5',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.40.02.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.open.promotion',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.40.02.010.50',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.sellers.one',//页面上的模块
          'p_action_id':'<%seller_id %>',//触发的视频ID
          'p_action_pos':'[1..10]',//触发时所在的第几个块
          'p_action_total':'<%seller_number%>',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.40.02.010.60',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'part.images.one',//页面上的模块
          'p_action_id':'<%image_id %>',//触发的视频ID
          'p_action_pos':'[1..10]',//触发时所在的第几个块
          'p_action_total':'<%shop_number%>',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.80.01.010.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'buttom.show.products',//页面上的模块
          'p_action_id':'',//触发的视频ID
          'p_action_pos':'',//触发时所在的第几个块
          'p_action_total':'',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.250.20.80.01.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.detail',//主页上视频栏目
          'p_title':'<%shop_name%>',//页面名字
          'p_id':'<%shop_id%>',//
          'p_item':'buttom.show.replys',//页面上的模块
          'p_action_id':'',//触发的视频ID
          'p_action_pos':'',//触发时所在的第几个块
          'p_action_total':'',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{

        }
      ]
    },
    registerView: {
      pageAndUserView: {
        'service': 'm.pvuv',
        'page': '110.600.02.00.00.000.19',
        'p_channel': 'home',
        'p_type': 'page.login',
        'p_title': '登陆'
      },
      clickEvent: [
        {
          'service':'m.click',//收集类型
          'page':'110.600.02.00.00.000.29',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.login.confirm',//主页
          'p_title':'<%user_phone%>',//页面名字
          'p_url':'< app包名+类名>',//地址
          'version':'',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.600.02.00.00.000.39',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.login.confirm',//主页
          'p_title':'<%user_phone%>',//页面名字
          'p_url':'< app包名+类名>',//地址
          'version':'',//来源埋点
        }
      ]
    },
    downloadView: {
      pageAndUserView: {
        'service':'m.pvuv',//收集类型
        'page':'110.600.04.00.00.000.10',//定值
        'p_domain':'mall.com',//主站点
        'p_channel':'home',//频道家居
        'p_type':'page.download',//主页
        'p_title':'下载',//页面名字
        'p_url':'< app包名+类名>',//地址
        'version':'',//来源埋点
      },
      clickEvent: [
        {
          'service':'m.click',//收集类型
          'page':'110.600.04.40.02.010.30',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.download',//主页上视频栏目
          'p_title':'<%user_name%>',//页面名字
          'p_id':'<%user_id%>',//
          'p_item':'buttom.download.sdk',//
          'p_action_id':'1',//
          'p_action_pos':'1',//
          'p_action_total':'2',//
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.600.04.40.02.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.download',//主页上视频栏目
          'p_title':'<%user_name%>',//页面名字
          'p_id':'<%user_id%>',//
          'p_item':'buttom.download.sdk',//
          'p_action_id':'1',//
          'p_action_pos':'1',//
          'p_action_total':'2',//
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        }
      ]
    },
    productView: {
      pageAndUserView: [
        {
          'service':'m.pvuv',//收集类型
          'page':'110.101.20.00.00.000.10',//定值
          'p_domain':'mmall.com',//主站点
          'p_channel':'home',//卖场首页
          'p_type':'page.shop.product.detail',//主页
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },
        {
          'service':'m.taytime',//收集类型
          'page':'110.101.20.00.00.000.99',//定值
          'p_domain':'mmall.com',//主站点
          'p_channel':'home',//卖场首页
          'p_type':'page.shop.product.detail',//主页
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        }
      ],
      exposureData: [
        {
          'service': 'sdk.expo',//收集类型
          'page': '110.101.01.40.60.021.10',//定值
          'p_domain': 'mall.com',//主站点
          'p_channel': 'home',//频道家居
          'p_type': 'page.shop.product.detail',//主页上视频栏目
          'p_id': '<%psg_id%>',//
          'p_title': '<%product_name%>',//页面名字
          'p_item': 'part.tags',//页面上的模块
          'p_url': '< app包名+类名>',//地址
          'version': 'sdk',//来源埋点
        },
        {
          'service': 'sdk.expo',//收集类型
          'page': '110.101.01.40.60.021.20',//定值
          'p_domain': 'mall.com',//主站点
          'p_channel': 'home',//频道家居
          'p_type': 'page.shop.product.detail',//主页上视频栏目
          'p_id': '<%psg_id%>',//
          'p_title': '<%product_name%>',//页面名字
          'p_item': 'part.recommand',//页面上的模块
          'p_url': '< app包名+类名>',//地址
          'version': 'sdk',//来源埋点
        },
        {
          'service':'m.expo',//收集类型
          'page':'110.101.01.40.60.021.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.product.detail',//主页上视频栏目
          'p_id':'<%product_good_id%>',//
          'p_title':'<%product_name%>',//页面名字
          'p_item':'part.detail.list',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        }
      ],
      clickEvent: [
        {
          'service':'m.click',//收集类型
          'page':'110.101.20.40.11.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.product.detail',//主页上视频栏目
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_item':'button.more.reply',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },
        {
          'service':'m.click',//收集类型
          'page':'110.101.20.80.01.010.50',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.product.detail',//主页上视频栏目
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_item':'button.contact.seller',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.101.20.40.11.010.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.product.detail',//主页上视频栏目
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_item':'part.tags.one',//页面上的模块
          'p_action_id':'<%tab_name%>',//触发的视频ID
          'p_action_pos':'[1/2/3/4]',//触发时所在的第几个块
          'p_action_total':'4',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.101.20.40.11.010.30',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.shop.product.detail',//主页上视频栏目
          'p_title':'<%product_name%>',//页面名字
          'p_id':'<%psg_id%>',//
          'p_item':'part.recommand.one',//页面上的模块
          'p_action_id':'<%product_recommand_id%>',//触发的视频ID
          'p_action_pos':'[1/2/3/4]',//触发时所在的第几个块
          'p_action_total':'4',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        }
      ]
    },
    shopAlbumListView: {
      pageAndUserView: [
        {
          'service': 'm.pvuv',//收集类型
          'page': '110.250.12.00.00.000.10',//定值
          'p_domain': 'mmall.com',//主站点
          'p_channel': 'home',//卖场首页
          'p_type': 'page.image.detail.shop',//主页
          'p_title': '<图片标题>',//页面名字
          'p_url': '< app包名+类名>',//地址
          'p_id': '<%image_id%>',//
          'version': 'sdk',//来源埋点
        }
      ],
      clickEvent: [
        {
          'service': 'sdk.click',//收集类型
          'page': '110.250.20.80.01.010.30',//定值
          'p_domain': 'mmall.com',//主站点
          'p_channel': 'home',//频道家居
          'p_type': 'page.image.list.shop',//主页上视频栏目
          'p_title': '<%shop_name%>',//页面名字
          'p_id': '<%shop_id%>',//
          'p_item': 'page.list.one',//页面上的模块
          'p_action_id': '<%image_id%>',//触发的视频ID
          'p_action_pos': '<%pos_in_list%>',//触发时所在的第几个块
          'p_action_total': '<%image_number%>',//总共有几个块
          'p_url': '< app包名+类名>',//地址
          'version': 'sdk',//来源埋点
        }
      ]
    },
    mallHomeView: {
      pageAndUserView: [
        {
          'service': 'm.pvuv',//收集类型
          'page': '110.200.20.00.00.000.00',//定值
          'p_domain': 'mall.com',//主站点
          'p_channel': 'home',//卖场首页
          'p_type': 'page.mall.detail',//主页
          'p_title': '<商场Name>',//页面名字
          'p_url': '< app包名+类名>',//地址
          'p_id': '<商场ID>',//
          'version': 'sdk',//来源埋点
        },{
          'service':'m.pvuv',//收集类型
          'page':'110.250.65.00.00.000.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//卖场首页
          'p_type':'page.image.detail.shop',//主页
          'p_title':'<图片标题>',//页面名字
          'p_url':'< app包名+类名>',//地址
          'p_id':'<%image_id%>',//
          'version':'sdk',//来源埋点
        }
      ],
      exposureData: [
        {
          'service':'m.expo',//收集类型
          'page':'110.200.20.40.12.021.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_name%>',//页面名字
          'p_item':'part.expricence',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<商场ID>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.200.20.40.12.021.30',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_name%>',//页面名字
          'p_item':'part.products',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<商场ID>',//
          'version':'sdk',//来源埋点
        },{
          'service':'m.expo',//收集类型
          'page':'110.200.20.40.12.021.40',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_name%>',//页面名字
          'p_item':'part.logos',//页面上的模块
          'p_url':'< app包名+类名>',//地址
          'p_id':'<商场ID>',//
          'version':'sdk',//来源埋点
        }
      ],
      eventClick: [
        {
          'service':'m.click',//收集类型
          'page':'110.200.01.41.02.010.10',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_id%>',//页面名字
          'p_item':'part.expricence.one',//页面上的模块
          'p_action_id':'<%title_name%>',//触发的视频ID
          'p_action_pos':'[1..5]',//触发时所在的第几个块
          'p_action_total':'5',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.200.01.41.02.010.20',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_id%>',//页面名字
          'p_item':'part.products.one',//页面上的模块
          'p_action_id':'<%product_id%>',//触发的视频ID
          'p_action_pos':'[1..4]',//触发时所在的第几个块
          'p_action_total':'4',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.200.01.41.02.010.30',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_id%>',//页面名字
          'p_item':'part.guider.one',//页面上的模块
          'p_action_id':'<%guider_id %>',//触发的视频ID
          'p_action_pos':'<%pos_in_list%>',//触发时所在的第几个块
          'p_action_total':'<%guider_number%>',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        },{
          'service':'m.click',//收集类型
          'page':'110.200.01.41.02.010.40',//定值
          'p_domain':'mall.com',//主站点
          'p_channel':'home',//频道家居
          'p_type':'page.mall.detail',//主页上视频栏目
          'p_title':'<%mall_id%>',//页面名字
          'p_item':'part.logos.one',//页面上的模块
          'p_action_id':'<%guider_id %>',//触发的视频ID
          'p_action_pos':'<%pos_in_list%>',//触发时所在的第几个块
          'p_action_total':'<%guider_number%>',//总共有几个块
          'p_url':'< app包名+类名>',//地址
          'version':'sdk',//来源埋点
        }
      ]
    }
  }
}
export default Config;
