/**
 * Created By Nguyen Cong Thanh on 07/24/2020 15:41.
 *
 * Copyright intelIn 2020.
 */

import Config from 'config'
import Logger from 'service/logger'
import Helper from 'service/helper'

class Timeout {

  constructor(setState, callback = () => { }, funcAfterTimeout = () => { }) {
    this.key = '';
    this.status = false;
    this.statusLoading = false
    this.field = '';
    this.message = '';
    this.timeout = null;
    this.setState = setState;
    this.callback = callback;
    this.funcAfterTimeout = funcAfterTimeout

    this.setTimeout = this.setTimeout.bind(this)
  }

  setTimeout(status = true, field = '', message = '') {
    try {
      Logger.info(`Timeout execute setTimeout`)
      Logger.debug(`Timeout execute setTimeout receive status `, status)
      Logger.debug(`Timeout execute setTimeout receive field `, field)
      Logger.debug(`Timeout execute setTimeout receive message `, message)
      this.setState((prevState) => ({
        timeout: {
          ...prevState.timeout,
          key: (status) ? Helper.generateKey() : '',
          status: status,
          statusLoading: status,
          field: field,
          message: message,
          setTimeout: prevState.timeout.setTimeout.bind(this)
        }
      }), (status) ? this.callback : () => { })
      clearTimeout(this.timeout)
      if (status) {
        this.timeout = setTimeout(() => {
          this.setTimeout(false, 'all', 'COMMON_SYSTEM_BUSY')
          this.funcAfterTimeout()
        }, Config.request.timeout)
      }
    } catch (e) {
      Logger.error(`Timeout execute setTimeout ${e.toString()}`)
    }
  }

}

export default Timeout