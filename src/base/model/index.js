/**
 * Created By Nguyen Cong Thanh on 07/25/2020 10:11.
 *
 * Copyright intelIn 2020.
 */

import Helper from 'service/helper'
import Logger from 'service/logger'

class BaseModel {

  constructor() { }

  hashPassword(password) {
    try {
      Logger.info(`BaseModel execute hashPassword`)
      Logger.debug(`BaseModel execute hashPassword receive password`, password)
      const hashPassword = Helper.hashRSA(Helper.hashMD5(password))
      return hashPassword
    } catch (e) {
      Logger.error(`BaseModel execute hashPassword ${e.toString()}`)
      throw e
    }
  }

}

export default BaseModel