import BaseAction from 'base/action'
import Config from 'config'
class SettingAction extends BaseAction {
  static getListSetting(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListSetting`)
      this.logger.debug(`ChallengeAction execute getListSetting receive key`, key)
      this.logger.debug(`ChallengeAction execute getListSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createChallenge',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.setting.getListSetting}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListSetting ${e.toString()}`)
    }
  }
  static updateSetting(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateSetting`)
      this.logger.debug(`ChallengeAction execute updateSetting receive key`, key)
      this.logger.debug(`ChallengeAction execute updateSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createChallenge',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.setting.updateSetting}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateSetting ${e.toString()}`)
    }
  }
  static getListBubble(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListBubble`)
      this.logger.debug(`ChallengeAction execute getListBubble receive key`, key)
      this.logger.debug(`ChallengeAction execute getListBubble receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListBubble',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.setting.getListBubble}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListBubble ${e.toString()}`)
    }
  }

  static createBubble(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createBubble`)
      this.logger.debug(`ChallengeAction execute createBubble receive key`, key)
      this.logger.debug(`ChallengeAction execute createBubble receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createBubble',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.setting.createBubble}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createBubble ${e.toString()}`)
    }
  }
  static updateBubble(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateBubble`)
      this.logger.debug(`ChallengeAction execute updateBubble receive key`, key)
      this.logger.debug(`ChallengeAction execute updateBubble receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateBubble',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.setting.updateBubble}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateBubble ${e.toString()}`)
    }
  }


}

export default SettingAction