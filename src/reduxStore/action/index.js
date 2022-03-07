/**
 * Created By Nguyen Cong Thanh on 07/23/2020 15:35.
 *
 * Copyright intelIn 2020.
 */

const TYPE = {
  STORE_UPDATE: {
    MESSAGE_CENTER: 'STORE_UPDATE_MESSAGE_CENTER',
    DIALOG: 'STORE_UPDATE_DIALOG',
    NOTIFY: 'STORE_UPDATE_NOTIFY',
  },
  COMMON: {
    REQUEST: 'COMMON_REQUEST'
  },
  THIRD_PARTY: {
    REQUEST: 'THIRD_PARTY_REQUEST'
  }
}

class Action {
  static get TYPE() { return TYPE }
}

export default Action