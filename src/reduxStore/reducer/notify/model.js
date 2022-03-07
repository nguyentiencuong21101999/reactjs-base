/**
 * Created By Nguyen Cong Thanh on 07/24/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

class NotifyModel {

  constructor(status, message, time = new Date().getTime()) {
    this.status = status
    this.message = message
    this.time = time
  }

}

export default NotifyModel