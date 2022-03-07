import BaseAction from 'base/action'
import Config from 'config'
class MemberAction extends BaseAction {
  static getListMember(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListMember`)
      this.logger.debug(`ChallengeAction execute getListMember receive key`, key)
      this.logger.debug(`ChallengeAction execute getListMember receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListMember',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.member.getListMember}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListMember ${e.toString()}`)
    }
  }
  static getDetailMember(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailMember`)
      this.logger.debug(`ChallengeAction execute getDetailMember receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailMember receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getDetailMember',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.member.getDetailMember}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailMember ${e.toString()}`)
    }
  }
  static getListHistory(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListHistory`)
      this.logger.debug(`ChallengeAction execute getListHistory receive key`, key)
      this.logger.debug(`ChallengeAction execute getListHistory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListHistory',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.member.getListHistory}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListHistory ${e.toString()}`)
    }
  }

}

export default MemberAction