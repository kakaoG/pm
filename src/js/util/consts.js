var consts = {
  label_shop_favor: 'label_shop_favor',
  label_shop_service: 'label_shop_service',
  label_shop_ue: 'label_shop_ue',
  style: {
    header_height: '4.4rem',
  },
  view_event: {
    destroy: 'destroy'
  },
  global_keys: {
    token: 'm_token'
  },
  radio: {
    event: 'common.event',
    event_signout: 'common.event.signout',
    event_dialog: 'common.event.dialog',
    event_download: 'common.event.download',
    event_navigate: 'common.event.navigate',
    event_enter_router: 'common.enter:router',
    event_after_fetch: 'common.after:fetch',
    event_before_router: 'common.before:router',
    event_dialog_error: 'common.dialog:error',
    event_dialog_toast: 'common.dialog:toast',
    event_dialog_loading: 'common.dialog:loading',
    event_dialog_close: 'common.dialog:close',
    event_toast_warn: 'common.toast:warn',
    event_toast_success: 'common.toast:success',
    event_rebuild_image_path: 'common.rebuild:image:path',
    event_proxy_link: 'event:proxy:link',
    net_communication: 'net.communication',
    net_success_error: 'net.success.error',
    net_success_ok: 'net.success.ok',
    net_error_500: 'net.error.500',
    net_error_401: 'net.error.401',
  },
  eventBus: {
    destroy: 'destroy'
  },
  error: {
    code500: {
      code: 500,
      msg: '系统错误, 请联系系统管理员.'
    },
    code401: {
      code: 401,
      msg: '请登录后再试.'
    },
  }
}
export default consts;