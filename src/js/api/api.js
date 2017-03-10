const api = {
  rootUrlRoot: '/api/m-web',
  wx: {
    user: {
      rootUrl: '/wx/user'
    }
  },
  auth: {
    rootUrl: '/auth',
    wx: {
      signature: {
        rootUrl: '/auth/wx/get-signature'
      }
    }
  },
  common:{
    qrcode: {
      rootUrl: '/common/code/create'
    }
  },
  merchant: {
    album: {
      rootUrl: '/merchant/album'
    },
    detail: {
      rootUrl: '/merchant/detail',
    }
  },
  merchant_coupon: {
    rootUrl: '/merchant/coupon',
  },
  shopping: {
    rootUrl: '/shopping'
  },
  market: {
    rootUrl: '/market/detail',
    marketMap: {
      rootUrl: '/market/floor/photo'
    },
    marketFloor: {
      rootUrl: '/market/floor'
    },
    brand: {
      rootUrl: '/market/brand'
    }
  },
  guide: {
    detail: {
      rootUrl: '/merchant/shopper'
    }
  },
  article: {
    detail: {
      rootUrl: '/article/detail'
    }
  },
  review: {
    rootUrl: '/review',
    detailReview: {
      rootUrl: '/review/detail'
    },
    share: {
      rootUrl: '/review/share'
    },
    writeReview: {
      rootUrl: '/review/add'
    },
    deleteReview: {
      rootUrl: '/review/delete'
    },
    praise: {
      rootUrl: '/review/praise',
    },
    upload: {
      rootUrl: '/review/upload'
    },
    label: {
      rootUrl: '/review/label'
    },
    list: {
      rootUrl: '/review/list'
    }
  },
  shoppingMall: {
    map: {
      rootUrl: '/shoppingMall/map',
    }
  },
  coupon: {
    contextPath: '/api/coupon',
    me: {
      rootUrl: '/user/cupon/pageNo/1/pageSize/100',
      contextPath: '/api/coupon'
    },
    detail: {
      rootUrl: '/cupon'
    },
    channel: {
      rootUrl: '/channel/<#=channelId#>/name/<#=channelName#>/subChannel/<#=subChannelId#>/user/cupon/<#=cuponId#>',
      contextPath: '/api/coupon'
    }
  },
  user: {
    rootUrl: '/user',
    follow: {
      rootUrl: '/user/collect'
    },
    logout: {
      rootUrl: '/user/logout'
    },
    collectList: {
      rootUrl: '/user/collectList'
    },
    coupon: {
      rootUrl: '/user/coupon'
    },
    commentList: {
      rootUrl: '/user/commentList'
    },
    shoppingList: {
      rootUrl: '/user/shopping'
    },
    login: {
      rootUrl: '/user/login'
    },
    // 用户中心登录
    uc: {
      authenticate: {
        rootUrl: '/user/authenticate'
      },
      shortcutSignin: {
        rootUrl: '/user/shortcutSignin'
      },
      signout: {
        rootUrl: '/user/signout'
      },
      smsCode: {
        rootUrl: '/common/smsCode'
      },
      profile: {
        rootUrl: '/user/profile'
      },
      contextPath: '/api/uc'
      //contextPath: 'http://api-user.test.rs.com:8080'
    },
    sendMsg: {
      rootUrl: '/user/sendMsg'
    },
    userInfo: {
      rootUrl: '/user/userInfo'
    },
    inventory: {
      list: {
        rootUrl: '/user/inventory/list'
      },
      goods: {
        rootUrl: '/user/inventory/goods',
        add: {
          rootUrl: '/user/inventory/goods/add'
        }
      }
    }
  },
  product: {
    rootUrl: '/product',
    detail: {
      rootUrl: '/product/detail'
    }
  },
  getUrl(prop = {}, contextPath, ...params) {
    let rootUrl = prop.rootUrl;
    if (!rootUrl) {
      rootUrl = _.get(this, prop).rootUrl;
    }
    if (contextPath) {
      rootUrl = contextPath + rootUrl;
    } else {
      rootUrl = this.rootUrlRoot + rootUrl;
    }
    return rootUrl;
  }
}
export default api;
