/**
 * Created By Nguyen Cong Thanh on 08/08/2020 11:01.
 *
 * Copyright intelIn 2020.
 */

import Logger from 'service/logger'
import Validator from 'service/validator'

class ValidatorResponseMerchant {

  static login(response) {
    try {
      Logger.info(`ValidatorResponseMerchant execute login`)
      Logger.debug(`ValidatorResponseMerchant execute login receive response`, response)
      Validator.isObject('data', response.data, 'Is not obj')
      Validator.isNotEmpty('token', response.data.token, 'Is not empty')
      Validator.isString('token', response.data.token, 'Is not string')
      return response
    } catch (e) {
      Logger.error(`ValidatorResponseMerchant execute login ${e.toString()}`)
      throw e
    }
  }

}

export default ValidatorResponseMerchant