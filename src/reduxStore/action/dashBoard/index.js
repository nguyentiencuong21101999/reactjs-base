import BaseAction from 'base/action'
import Config from 'config'
class DashBoardAction extends BaseAction {
  static getDetailDashBoard(key, payload = null) {
    try {
      this.logger.info(`ChallengeAction execute getDetailDashBoard`)
      this.logger.debug(`ChallengeAction execute getDetailDashBoard receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailDashBoard receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getDetailDashBoard',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.dashBoard.getDetailDashBoard}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailDashBoard ${e.toString()}`)
    }
  }



}

export default DashBoardAction