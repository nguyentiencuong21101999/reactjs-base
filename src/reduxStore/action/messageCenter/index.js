/**
 * Created By Nguyen Cong Thanh on 07/25/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

import BaseAction from 'base/action'

class MessageCenterAction extends BaseAction {

  static update(payload) {
    this.logger.info('MessageCenterAction execute update')
    this.logger.debug('Receive payload', payload)
    try {
      return {
        type: this.action.TYPE.STORE_UPDATE.MESSAGE_CENTER,
        payload: payload,
      }
    } catch (e) {
      this.logger.error(`MessageCenterAction update ${e.message.toString()}`)
    }
  }

}

export default MessageCenterAction
