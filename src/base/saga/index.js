/**
 * Created By Nguyen Cong Thanh on 07/24/2020 11:22.
 *
 * Copyright intelIn 2020.
 */

import Axios from 'axios'

import Config from 'config'
import Logger from 'service/logger'
import Helper from 'service/helper'
import Action from 'reduxStore/action'
import Validator from 'service/validator'
import ResponseCode from 'service/responseCode'
import ResponseCodeHttp from 'service/responseCode/http'

import ValidatorResponseUser from 'service/validator/response/user'

let axios = Axios.create({
  baseURL: Config.api.host,
  timeout: Config.request.timeout
});

let code = new Map([])
code.set(`${ResponseCode.REQUEST.LOGIN_2000}-${'MerchantAction login'}`, ValidatorResponseUser.login.bind(ValidatorResponseUser))

// third party
// code.set(`${ResponseCode.REQUEST.QUESTION_2000}-${'UserAction getListQuestion'}`, ValidatorResponseUser.getListQuestion.bind(ValidatorResponseUser))

class BaseSaga {

  static action = Action
  static logger = Logger
  static actionName = new Map([])
  static code = code

  static request(action) {
    try {
      this.logger.info('BaseSaga execute request')
      this.logger.debug(`BaseSaga execute request Receive action`, action)
      this.actionName.set(action.key, action.name)
      return axios.request(action.options)
        .then((response) => {
          const actionName = BaseSaga.actionName.get(action.key)
          BaseSaga.actionName.delete(action.key)
          return BaseSaga.response(response, actionName)
        }).catch((e) => {
          throw e
        })
    } catch (e) {
      this.logger.error(`BaseSaga execute request error ${e.toString()}`)
      throw e
    }
  }

  static response(response, actionName) {
    try {
      this.logger.info('BaseSaga execute response')
      this.logger.debug('BaseSaga execute response Receive response', response)
      this.logger.debug('BaseSaga execute response Receive actionName', actionName)
      const { status } = response
      if (status !== ResponseCodeHttp.OK) throw { field: `Http status code ${status}`, message: ResponseCodeHttp[status] || 'Message undefined' }
      const { data } = response
      Validator.isNotEmpty('', data, 'response data is null')
      Validator.isNotEmpty('code', data.code, 'response code is not empty')
      Validator.isString('code', data.code, 'response code is not string')
      Validator.isNotEmpty('data', data.data, 'response data is not empty')
      if (code.has(data.code)) {
        return code.get(data.code)(data)
      }
      const codeActionName = `${data.code}-${actionName}`
      if (code.has(codeActionName)) {
        return code.get(codeActionName)(data)
      }
      return data
    } catch (e) {
      this.logger.error(`BaseSaga execute response ${e.toString()}`)
      throw e
    }
  }

  static requestThirdParty(action) {
    try {
      this.logger.info('BaseSaga execute request')
      this.logger.debug(`BaseSaga execute request Receive action`, action)
      this.actionName.set(action.key, action.name)
      return axios.request(action.options)
        .then((response) => {
          const actionName = BaseSaga.actionName.get(action.key)
          BaseSaga.actionName.delete(action.key)
          return BaseSaga.responseThirdParty(response, actionName, action.codeResponse)
        }).catch((e) => {
          throw e
        })
    } catch (e) {
      this.logger.error(`BaseSaga execute request error ${e.toString()}`)
      throw e
    }
  }

  static responseThirdParty(response, actionName, codeResponse) {
    try {
      this.logger.info('BaseSaga execute responseThirdParty')
      this.logger.debug('BaseSaga execute responseThirdParty Receive response', response)
      this.logger.debug('BaseSaga execute responseThirdParty Receive actionName', actionName)
      const { status } = response
      if (status !== ResponseCodeHttp.OK) throw { field: `Http status code ${status}`, message: ResponseCodeHttp[status] || 'Message undefined' }
      const { data } = response
      Validator.isNotEmpty('', data, 'response data is null')
      Validator.isNotEmpty('data', data.data, 'response data is not empty')
      if (!Helper.isEmpty(codeResponse)) {
        data.code = codeResponse
      } else {
        Validator.isNotEmpty('code', data.code, 'response code is not empty')
        Validator.isString('code', data.code, 'response code is not string')
      }
      if (code.has(data.code)) {
        return code.get(data.code)(data)
      }
      const codeActionName = `${data.code}-${actionName}`
      if (code.has(codeActionName)) {
        return code.get(codeActionName)(data)
      }
      return data
    } catch (e) {
      this.logger.error(`BaseSaga execute responseThirdParty ${e.toString()}`)
      throw e
    }
  }
}

export default BaseSaga