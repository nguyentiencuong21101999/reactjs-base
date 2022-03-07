import BaseAction from "base/action";
import Config from "config";
class RewardAction extends BaseAction {
  static getListReward(key, payload) {
    try {
      this.logger.info(`RewardAction execute getListReward`);
      this.logger.debug(`RewardAction execute getListReward receive key`, key);
      this.logger.debug(`RewardAction execute getListReward receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction createChallenge",
        options: {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.getListReward}`,
          data: payload,
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute getListReward ${e.toString()}`);
    }
  }
  static getDetailReward(key, payload) {
    try {
      this.logger.info(`RewardAction execute getDetailReward`);
      this.logger.debug(`RewardAction execute getDetailReward receive key`, key);
      this.logger.debug(`RewardAction execute getDetailReward receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction getDetailReward",
        options: {
          method: "GET",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.getDetailReward}/${payload}`,
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute getDetailReward ${e.toString()}`);
    }
  }
  static getListRequired(key, payload) {
    try {
      this.logger.info(`RewardAction execute getListRequired`);
      this.logger.debug(`RewardAction execute getListRequired receive key`, key);
      this.logger.debug(`RewardAction execute getListRequired receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction getListRequired",
        options: {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.getListRequired}`,
          data:payload
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute getListRequired ${e.toString()}`);
    }
  }
    static updateListRequest(key, payload) {
    try {
      this.logger.info(`RewardAction execute updateListRequest`);
      this.logger.debug(`RewardAction execute updateListRequest receive key`, key);
      this.logger.debug(`RewardAction execute updateListRequest receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction updateListRequest",
        options: {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.updateListRequest}`,
          data:payload
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute updateListRequest ${e.toString()}`);
    }
  }
  static applyReward(key, payload) {
    try {
      this.logger.info(`RewardAction execute applyReward`);
      this.logger.debug(`RewardAction execute applyReward receive key`, key);
      this.logger.debug(`RewardAction execute applyReward receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction applyReward",
        options: {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.applyReward}`,
          data:payload
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute applyReward ${e.toString()}`);
    }
  }
  static createReward(key, payload) {
    try {
      this.logger.info(`RewardAction execute createReward`);
      this.logger.debug(`RewardAction execute createReward receive key`, key);
      this.logger.debug(`RewardAction execute createReward receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction createReward",
        options: {
          method: "POST",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.createReward}`,
          data:payload
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute createReward ${e.toString()}`);
    }
  }
  static updateReward(key, payload) {
    try {
      this.logger.info(`RewardAction execute updateReward`);
      this.logger.debug(`RewardAction execute updateReward receive key`, key);
      this.logger.debug(`RewardAction execute updateReward receive payload`, payload);
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: "RewardAction updateReward",
        options: {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            token: this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.reward.updateReward}`,
          data:payload
        },
      };
    } catch (e) {
      this.logger.error(`RewardAction execute updateReward ${e.toString()}`);
    }
  }
}

export default RewardAction;
