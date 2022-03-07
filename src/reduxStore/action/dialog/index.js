/**
 * Created By Nguyen Cong Thanh on 07/25/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

import BaseAction from 'base/action'

class DialogAction extends BaseAction {

  static update(data) {
    try {
      this.logger.info('DialogAction execute update')
      this.logger.debug('DialogAction execute update Receive data', data)
      return {
        type: this.action.TYPE.STORE_UPDATE.DIALOG,
        payload: data
      }
    } catch (e) {
      this.logger.error(`DialogAction execute sendInfo ${e.toString()}`)
    }
  }

}

export default DialogAction
