import BaseAction from 'base/action'
import Config from 'config'
class SubChallengeAction extends BaseAction {
  static getDetailChallengeChain(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailChallengeChain`)
      this.logger.debug(`ChallengeAction execute getDetailChallengeChain receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailChallengeChain receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createChallenge',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.getDetailChallengeChain}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailChallengeChain ${e.toString()}`)
    }
  }
  static getDetailSubChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailSubChallenge`)
      this.logger.debug(`ChallengeAction execute getDetailSubChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailSubChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createChallenge',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.getDetailSubChallenge}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailSubChallenge ${e.toString()}`)
    }
  }
  static createSubChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createSubChallenge`)
      this.logger.debug(`ChallengeAction execute createSubChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute createSubChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction createSubChallenge',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.createSubChallenge}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createSubChallenge ${e.toString()}`)
    }
  }
  static updateSubChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateSubChallenge`)
      this.logger.debug(`ChallengeAction execute updateSubChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute updateSubChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateSubChallenge',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.updateSubChallenge}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateSubChallenge ${e.toString()}`)
    }
  }
  static removeSubChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute removeSubChallenge`)
      this.logger.debug(`ChallengeAction execute removeSubChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute removeSubChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction removeSubChallenge',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.removeSubChallenge}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute removeSubChallenge ${e.toString()}`)
    }
  }
  static approveSubChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute approveSubChallenge`)
      this.logger.debug(`ChallengeAction execute approveSubChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute approveSubChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction approveSubChallenge',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.approveSubChallenge}`,
          data: payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute approveSubChallenge ${e.toString()}`)
    }
  }
  static getListPostLink(key) {
    try {
      this.logger.info(`ChallengeAction execute getListPostLink`)
      this.logger.debug(`ChallengeAction execute getListPostLink receive key`, key)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListPostLink',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.subChallenge.getListPostLink}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListPostLink ${e.toString()}`)
    }
  }

}

export default SubChallengeAction