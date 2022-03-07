import BaseAction from 'base/action'
import Config from 'config'
class SettingPrizeAction extends BaseAction {
    static getListSettingPrize(key, payload) {
        try {
          this.logger.info(`ChallengeAction execute getListSettingPrize`)
          this.logger.debug(`ChallengeAction execute getListSettingPrize receive key`, key)
          this.logger.debug(`ChallengeAction execute getListSettingPrize receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'ChallengeAction getListSettingPrize',
            options: {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'token': this.getToken(),
              },
              baseURL: Config.api2.host,
              url: `${this.api2.admin.settingPrize.getListSettingPrize}/${payload}`,
            },
          }
        } catch (e) {
          this.logger.error(`ChallengeAction execute getListSettingPrize ${e.toString()}`)
        }
      }
      static createSettingPrize(key, payload) {
        try {
          this.logger.info(`ChallengeAction execute createSettingPrize`)
          this.logger.debug(`ChallengeAction execute createSettingPrize receive key`, key)
          this.logger.debug(`ChallengeAction execute createSettingPrize receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'ChallengeAction createSettingPrize',
            options: {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'token': this.getToken(),
              },
              baseURL: Config.api2.host,
              url: `${this.api2.admin.settingPrize.createSettingPrize}`,
              data:payload
            },
          }
        } catch (e) {
          this.logger.error(`ChallengeAction execute createSettingPrize ${e.toString()}`)
        }
      }
      static updateSettingPrize(key, payload) {
        try {
          this.logger.info(`ChallengeAction execute updateSettingPrize`)
          this.logger.debug(`ChallengeAction execute updateSettingPrize receive key`, key)
          this.logger.debug(`ChallengeAction execute updateSettingPrize receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'ChallengeAction updateSettingPrize',
            options: {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
                'token': this.getToken(),
              },
              baseURL: Config.api2.host,
              url: `${this.api2.admin.settingPrize.updateSettingPrize}`,
              data:payload
            },
          }
        } catch (e) {
          this.logger.error(`ChallengeAction execute updateSettingPrize ${e.toString()}`)
        }
      }
}

export default SettingPrizeAction