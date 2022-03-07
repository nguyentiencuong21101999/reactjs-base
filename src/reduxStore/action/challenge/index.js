import BaseAction from 'base/action'
import Config from 'config'
class ChallengeAction extends BaseAction {
  static getDetailChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailChallenge`)
      this.logger.debug(`ChallengeAction execute getDetailChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailChallenge receive payload`, payload)
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
          url: `${this.api2.admin.challenge.getDetailChallenge}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailChallenge ${e.toString()}`)
    }
  }
  static getDetailUserChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getDetailUserChallenge`)
      this.logger.debug(`ChallengeAction execute getDetailUserChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute getDetailUserChallenge receive payload`, payload)
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
          url: `${this.api2.admin.challenge.getDetailUserChallenge}/${payload.userId}/${payload.challengeId}`,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getDetailUserChallenge ${e.toString()}`)
    }
  }
  static createChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute createChallenge`)
      this.logger.debug(`ChallengeAction execute createChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute createChallenge receive payload`, payload)
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
          url: `${this.api2.admin.challenge.create}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute createChallenge ${e.toString()}`)
    }
  }
  static updateChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateChallenge`)
      this.logger.debug(`ChallengeAction execute updateChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute updateChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateChallenge',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateChallenge}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateChallenge ${e.toString()}`)
    }
  }
  static getAllChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getAllChallenge`)
      this.logger.debug(`ChallengeAction execute getAllChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute getAllChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getAllChallenge',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.getAllChallenge}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getAllChallenge ${e.toString()}`)
    }
  }

  static getListParticipant(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListParticipant`)
      this.logger.debug(`ChallengeAction execute getListParticipant receive key`, key)
      this.logger.debug(`ChallengeAction execute getListParticipant receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListParticipant',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.getListParticipant}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListParticipant ${e.toString()}`)
    }
  }
  static getListPostParticipant(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListPostParticipant`)
      this.logger.debug(`ChallengeAction execute getListPostParticipant receive key`, key)
      this.logger.debug(`ChallengeAction execute getListPostParticipant receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListPostParticipant',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.getListPostParticipant}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListPostParticipant ${e.toString()}`)
    }
  }

  static getListPostParticipantMission(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute getListPostParticipantMission`)
      this.logger.debug(`ChallengeAction execute getListPostParticipantMission receive key`, key)
      this.logger.debug(`ChallengeAction execute getListPostParticipantMission receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction getListPostParticipantMission',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.getListPostParticipantMission}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute getListPostParticipantMission ${e.toString()}`)
    }
  }
  static updateChallengePostResult(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateChallengePostResult`)
      this.logger.debug(`ChallengeAction execute updateChallengePostResult receive key`, key)
      this.logger.debug(`ChallengeAction execute updateChallengePostResult receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateChallengePostResult',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateChallengePostResult}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateChallengePostResult ${e.toString()}`)
    }
  }
  static updateUserChallengeResult(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateUserChallengeResult`)
      this.logger.debug(`ChallengeAction execute updateUserChallengeResult receive key`, key)
      this.logger.debug(`ChallengeAction execute updateUserChallengeResult receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateUserChallengeResult',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateUserChallengeResult}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateUserChallengeResult ${e.toString()}`)
    }
  }
  static updateUserChallengeRank(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateUserChallengeRank`)
      this.logger.debug(`ChallengeAction execute updateUserChallengeRank receive key`, key)
      this.logger.debug(`ChallengeAction execute updateUserChallengeRank receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateUserChallengeRank',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateUserChallengeRank}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateUserChallengeRank ${e.toString()}`)
    }
  }
  static updateUserChallengeMissionResult(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateUserChallengeMissionResult`)
      this.logger.debug(`ChallengeAction execute updateUserChallengeMissionResult receive key`, key)
      this.logger.debug(`ChallengeAction execute updateUserChallengeMissionResult receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateUserChallengeResult',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateUserChallengeMissionResult}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateUserChallengeResult ${e.toString()}`)
    }
  }
  static updateChallengeResult(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute updateChallengeResult`)
      this.logger.debug(`ChallengeAction execute updateChallengeResult receive key`, key)
      this.logger.debug(`ChallengeAction execute updateChallengeResult receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction updateChallengeResult',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.updateChallengeResult}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute updateChallengeResult ${e.toString()}`)
    }
  }
  static applyChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute applyChallenge`)
      this.logger.debug(`ChallengeAction execute applyChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute applyChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction applyChallenge',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.applyChallenge}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute applyChallenge ${e.toString()}`)
    }
  }
  static endChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute endChallenge`)
      this.logger.debug(`ChallengeAction execute endChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute endChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction endChallenge',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.endChallenge}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute endChallenge ${e.toString()}`)
    }
  }
  static sendNotificationChallenge(key, payload) {
    try {
      this.logger.info(`ChallengeAction execute sendNotificationChallenge`)
      this.logger.debug(`ChallengeAction execute sendNotificationChallenge receive key`, key)
      this.logger.debug(`ChallengeAction execute sendNotificationChallenge receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'ChallengeAction sendNotificationChallenge',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.challenge.sendNotificationChallenge}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`ChallengeAction execute sendNotificationChallenge ${e.toString()}`)
    }
  }


}

export default ChallengeAction