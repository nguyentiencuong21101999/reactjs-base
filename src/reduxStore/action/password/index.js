/**
 * Created By Nguyen Cong Thanh on 10/26/2020 16:20.
 *
 * Copyright intelIn 2020.
 */

import BaseAction from 'base/action'

class PasswordAction extends BaseAction {

  static reset(key, payload) {
    try {
      this.logger.info(`PasswordAction execute reset`)
      this.logger.debug(`PasswordAction execute reset receive key`, key)
      this.logger.debug(`PasswordAction execute reset receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PasswordAction reset',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: this.api.password.reset,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`PasswordAction execute update ${e.toString()}`)
    }
  }

  static getToken(key, payload) {
    try {
      this.logger.info(`PasswordAction execute getToken`)
      this.logger.debug(`PasswordAction execute getToken receive key`, key)
      this.logger.debug(`PasswordAction execute getToken receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PasswordAction getToken',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          url: `${this.api.password.reset}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`PasswordAction execute getToken ${e.toString()}`)
    }
  }

  static forgot(key, payload) {
    try {
      this.logger.info(`PasswordAction execute forgot`)
      this.logger.debug(`PasswordAction execute forgot receive key`, key)
      this.logger.debug(`PasswordAction execute forgot receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PasswordAction forgot',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': BaseAction.getToken(),
          },
          url: this.api.admin.password.reset,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`PasswordAction execute update ${e.toString()}`)
    }
  }
  static forgotNotActive(key, payload) {
    try {
      this.logger.info(`PasswordAction execute forgotNotActive`)
      this.logger.debug(`PasswordAction execute forgotNotActive receive key`, key)
      this.logger.debug(`PasswordAction execute forgotNotActive receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PasswordAction forgotNotActive',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': BaseAction.getToken(),
          },
          url: this.api.admin.password.forgotNotActive,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`PasswordAction execute update ${e.toString()}`)
    }
  }

}

export default PasswordAction
