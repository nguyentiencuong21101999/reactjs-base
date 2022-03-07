import BaseAction from 'base/action'
import Config from 'config'
class TeachingPregnancyAction extends BaseAction {
  static getListTeachingPregnancy(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListTeachingPregnancy`)
      this.logger.debug(`ChallengeAction execute getListTeachingPregnancy receive key`, key)
      this.logger.debug(`ChallengeAction execute getListTeachingPregnancy receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListTeachingPregnancy',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.teachingPregnancy.getListTeachingPregnancy}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListTeachingPregnancy ${e.toString()}`)
    }
  }
  static createTeachingPregnancy(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createTeachingPregnancy`)
      this.logger.debug(`ChallengeAction execute createTeachingPregnancy receive key`, key)
      this.logger.debug(`ChallengeAction execute createTeachingPregnancy receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createTeachingPregnancy',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.teachingPregnancy.createTeachingPregnancy}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createTeachingPregnancy ${e.toString()}`)
    }
  }
  static getDetailTeachingPregnancy(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailTeachingPregnancy`)
      this.logger.debug(`ChallengeAction execute getDetailTeachingPregnancy receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailTeachingPregnancy receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getDetailTeachingPregnancy',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.teachingPregnancy.getDetailTeachingPregnancy}/${payload}`
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailTeachingPregnancy ${e.toString()}`)
    }
  }
  static updateTeachingPregnancy(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateTeachingPregnancy`)
      this.logger.debug(`ChallengeAction execute updateTeachingPregnancy receive key`, key)
      this.logger.debug(`ChallengeAction execute updateTeachingPregnancy receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateTeachingPregnancy',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.teachingPregnancy.updateTeachingPregnancy}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateTeachingPregnancy ${e.toString()}`)
    }
  }


}

export default TeachingPregnancyAction