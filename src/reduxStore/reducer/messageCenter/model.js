/**
 * Created By Nguyen Cong Thanh on 07/24/2020 14:00.
 *
 * Copyright intelIn 2020.
 */

class MessageCenterModel {

  constructor(key = null, code = null, data = null) {
    this.key = key
    this.code = code
    this.data = data
  }

  getInfo() {
    return {
      code: this.code,
      data: this.data,
      key: this.key,
    }
  }

  setCode(code) {
    this.code = code
  }

  setData(data) {
    this.data = data
  }

  setKey(key) {
    this.key = key
  }

}

export default MessageCenterModel