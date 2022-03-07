/**
 * Created By Nguyen Cong Thanh on 07/25/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

import BaseAction from 'base/action'
import Config from 'config'
class NotifyAction extends BaseAction {

  static update(payload) {
    try {
      this.logger.info('NotifyAction execute update')
      this.logger.debug('NotifyAction execute update Receive payload', payload)
      return {
        type: this.action.TYPE.STORE_UPDATE.NOTIFY,
        payload: payload
      }
    } catch (e) {
      this.logger.error(`NotifyAction execute sendInfo ${e.toString()}`)
    }
  }

  static getList(key, payload) {
    try {
      this.logger.info('NotifyAction execute getList')
      this.logger.debug('NotifyAction execute getList Receive payload', payload)
      this.logger.debug(`NotifyAction execute getList Receive key`, key)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'NotifyAction getList',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.merchant.notification}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`NotifyAction execute getList ${e.toString()}`)
    }
  }

  static getDetail(key, payload) {
    try {
      this.logger.info('NotifyAction execute getDetail')
      this.logger.debug('NotifyAction execute getDetail Receive payload', payload)
      this.logger.debug(`NotifyAction execute getDetail Receive key`, key)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'NotifyAction getDetail',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.merchant.notification}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`NotifyAction execute getDetail ${e.toString()}`)
    }
  }

  static markAllRead(key) {
    try {
      this.logger.info('NotifyAction execute markAllRead')
      this.logger.debug(`NotifyAction execute markAllRead Receive key`, key)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'NotifyAction markAllRead',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.merchant.notification}`,
          data: {},
        },
      }
    } catch (e) {
      this.logger.error(`NotifyAction execute markAllRead ${e.toString()}`)
    }
  }
  
  static checkListDataImport(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute checkListDataImport`)
      this.logger.debug(`ChallengeAction execute checkListDataImport receive key`, key)
      this.logger.debug(`ChallengeAction execute checkListDataImport receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction checkListDataImport',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.notification.checkListDataImport}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute checkListDataImport ${e.toString()}`)
    }
  }
  static createNotification(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createNotification`)
      this.logger.debug(`ChallengeAction execute createNotification receive key`, key)
      this.logger.debug(`ChallengeAction execute createNotification receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createNotification',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.notification.createNotification}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createNotification ${e.toString()}`)
    }
  }
  static getListNotification(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListNotification`)
      this.logger.debug(`ChallengeAction execute getListNotification receive key`, key)
      this.logger.debug(`ChallengeAction execute getListNotification receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListNotification',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.notification.getListNotification}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListNotification ${e.toString()}`)
    }
  }
  static getListNotificationReceived(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListNotificationReceived`)
      this.logger.debug(`ChallengeAction execute getListNotificationReceived receive key`, key)
      this.logger.debug(`ChallengeAction execute getListNotificationReceived receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListNotificationReceived',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.notification.getListNotificationReceived}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListNotificationReceived ${e.toString()}`)
    }
  }


}

export default NotifyAction
