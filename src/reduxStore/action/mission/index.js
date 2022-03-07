import BaseAction from 'base/action'
import Config from 'config'
class MissionAction extends BaseAction {
    static createMission(key, payload) {
        try {
            this.logger.info(`ChallengeAction execute createMission`)
            this.logger.debug(`ChallengeAction execute createMission receive key`, key)
            this.logger.debug(`ChallengeAction execute createMission receive payload`, payload)
            return {
                type: this.action.TYPE.COMMON.REQUEST,
                key: key,
                name: 'ChallengeAction createMission',
                options: {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'token': this.getToken(),
                    },
                    baseURL: Config.api2.host,
                    url: `${this.api2.admin.mission.createMission}`,
                    data: payload
                },
            }
        } catch (e) {
            this.logger.error(`ChallengeAction execute createMission ${e.toString()}`)
        }
    }
    static removeMission(key, payload) {
        try {
            this.logger.info(`ChallengeAction execute removeMission`)
            this.logger.debug(`ChallengeAction execute removeMission receive key`, key)
            this.logger.debug(`ChallengeAction execute removeMission receive payload`, payload)
            return {
                type: this.action.TYPE.COMMON.REQUEST,
                key: key,
                name: 'ChallengeAction removeMission',
                options: {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'token': this.getToken(),
                    },
                    baseURL: Config.api2.host,
                    url: `${this.api2.admin.mission.removeMission}/${payload}`
                },
            }
        } catch (e) {
            this.logger.error(`ChallengeAction execute removeMission ${e.toString()}`)
        }
    }
    static getDetailMission(key, payload) {
        try {
            this.logger.info(`ChallengeAction execute getDetailMission`)
            this.logger.debug(`ChallengeAction execute getDetailMission receive key`, key)
            this.logger.debug(`ChallengeAction execute getDetailMission receive payload`, payload)
            return {
                type: this.action.TYPE.COMMON.REQUEST,
                key: key,
                name: 'ChallengeAction getDetailMission',
                options: {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'token': this.getToken(),
                    },
                    baseURL: Config.api2.host,
                    url: `${this.api2.admin.mission.removeMission}/${payload}`
                },
            }
        } catch (e) {
            this.logger.error(`ChallengeAction execute getDetailMission ${e.toString()}`)
        }
    }
    static changePositionMission(key, payload) {
        try {
            this.logger.info(`ChallengeAction execute changePositionMission`)
            this.logger.debug(`ChallengeAction execute changePositionMission receive key`, key)
            this.logger.debug(`ChallengeAction execute changePositionMission receive payload`, payload)
            return {
                type: this.action.TYPE.COMMON.REQUEST,
                key: key,
                name: 'ChallengeAction changePositionMission',
                options: {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'token': this.getToken(),
                    },
                    baseURL: Config.api2.host,
                    url: `${this.api2.admin.mission.changePositionMission}`,
                    data: payload
                },
            }
        } catch (e) {
            this.logger.error(`ChallengeAction execute changePositionMission ${e.toString()}`)
        }
    }


}

export default MissionAction