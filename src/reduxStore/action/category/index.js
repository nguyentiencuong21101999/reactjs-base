import BaseAction from 'base/action'
import Config from 'config'
class CategoryAction extends BaseAction {
 
  static getListCategory(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListCategory`)
      this.logger.debug(`ChallengeAction execute getListCategory receive key`, key)
      this.logger.debug(`ChallengeAction execute getListCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListCategory',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.category.getListCategory}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListCategory ${e.toString()}`)
    }
  }

  static createCategory(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createCategory`)
      this.logger.debug(`ChallengeAction execute createCategory receive key`, key)
      this.logger.debug(`ChallengeAction execute createCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createCategory',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.category.createCategory}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createCategory ${e.toString()}`)
    }
  }
  static getDetailCategory(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailCategory`)
      this.logger.debug(`ChallengeAction execute getDetailCategory receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getDetailCategory',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.category.getDetailCategory}/${payload}`
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailCategory ${e.toString()}`)
    }
  }
  static updateCategory(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateCategory`)
      this.logger.debug(`ChallengeAction execute updateCategory receive key`, key)
      this.logger.debug(`ChallengeAction execute updateCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateCategory',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.category.updateCategory}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateCategory ${e.toString()}`)
    }
  }

}

export default CategoryAction