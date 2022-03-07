import Localize from "service/localize";

const PROMOTION_TYPE = {
  UNKNOWN: 0,
  GIFT: 1,
  COUPON: 2,
  PHONE_CARD: 3,
};

const PROMOTION_TYPE_PARSE = {
  [PROMOTION_TYPE.UNKNOWN]: "",
  [PROMOTION_TYPE.GIFT]: Localize.getLocalize("LC_GIFT_KIND"),
  [PROMOTION_TYPE.COUPON]: Localize.getLocalize("LC_VOUCHER"),
  [PROMOTION_TYPE.PHONE_CARD]: Localize.getLocalize("LC_PHONE_CARD"),
};

const PROMOTION_STATUS = {
  ALL: -2,
  UNKNOWN: -1,
  NEW: 0,
  APPLIED: 1,
  POSTPONE: 2,
};

const PROMOTION_STATUS_PARSE = {
  [PROMOTION_STATUS.ALL]: Localize.getLocalize("LC_ALL"),
  [PROMOTION_STATUS.UNKNOWN]: "",
  [PROMOTION_STATUS.NEW]: Localize.getLocalize("LC_DRAFT"),
  [PROMOTION_STATUS.APPLIED]: Localize.getLocalize("LC_APPLY"),
  [PROMOTION_STATUS.POSTPONE]: Localize.getLocalize("LC_PAUSE"),
};

const PROMOTION_LIMIT = {
  LIMITED: 0,
  UNLIMITED: 1,
};

const PROMOTION_LIMIT_PARSE = {
  [PROMOTION_LIMIT.LIMITED]: Localize.getLocalize("LC_LIMIT"),
  [PROMOTION_LIMIT.UNLIMITED]: Localize.getLocalize("LC_UNLIMIT"),
};
const PROMOTION_BONUS_LIMIT = {
  LIMITED: 0,
  UNLIMITED: 1,
};

const PROMOTION_BONUS_LIMIT_PARSE = {
  [PROMOTION_LIMIT.LIMITED]: Localize.getLocalize("LC_LIMIT_USER_MONTH"),
  [PROMOTION_LIMIT.UNLIMITED]: Localize.getLocalize("LC_UNLIMIT"),
};

const PROMOTION_REQUEST_STATUS = {
  ALL: -1,
  UNKNOWN: 0,
  NEW: 1,
  PROCESSING: 2,
  DONE: 3
};

const PROMOTION_REQUEST_STATUS_PARSE = {
  [PROMOTION_REQUEST_STATUS.ALL]: Localize.getLocalize("LC_ALL"),
  [PROMOTION_REQUEST_STATUS.NEW]: Localize.getLocalize("LC_STATUS_WAIT_PROCESS"),
  [PROMOTION_REQUEST_STATUS.PROCESSING]: Localize.getLocalize("LC_STATUS_INPROCESS"),
  [PROMOTION_REQUEST_STATUS.DONE]: Localize.getLocalize("LC_STATUS_PROCESSED"),
};

const HISTORY_ACTION_TYPE = {
  ALL: -1,
  UNKNOWN: 0,
  EXCHANGE: 1,
  ADD_BY_CLEAR_MISSION: 2,
  ADD_BY_CLEAR_7_DAYS_CONTINUOUS: 3,
  ADD_BY_INVITE_FRIEND: 4,
  ADD_BY_POST_CHALLENGE_REWARD: 5,
  ADD_BY_POST_ENTER_INVITE_CODE: 6
};

const HISTORY_ACTION_TYPE_PARSE = {
  [HISTORY_ACTION_TYPE.ALL]: Localize.getLocalize("LC_ALL"),
  [HISTORY_ACTION_TYPE.EXCHANGE]: Localize.getLocalize("LC_ACTION_EXCHANGE"),
  [HISTORY_ACTION_TYPE.ADD_BY_CLEAR_MISSION]: Localize.getLocalize("LC_ACTION_COMPLETE_MISSION"),
  [HISTORY_ACTION_TYPE.ADD_BY_CLEAR_7_DAYS_CONTINUOUS]: Localize.getLocalize("LC_ACTION_COMPLETE_MISSION_SEQUENT_7DAYS"),
  [HISTORY_ACTION_TYPE.ADD_BY_INVITE_FRIEND]: Localize.getLocalize("LC_ACTION_INVITE_FRIEND"),
  [HISTORY_ACTION_TYPE.ADD_BY_POST_CHALLENGE_REWARD]: Localize.getLocalize("LC_ACTION_WIN_CHALLENGE_POST"),
  [HISTORY_ACTION_TYPE.ADD_BY_POST_ENTER_INVITE_CODE]: Localize.getLocalize("LC_ACTION_ENTER_CODE_INVITE_FRIEND"),

};


class RewardEnum {
  static get PROMOTION_TYPE() {
    return PROMOTION_TYPE;
  }
  static get PROMOTION_TYPE_PARSE() {
    return PROMOTION_TYPE_PARSE;
  }
  static get PROMOTION_STATUS() {
    return PROMOTION_STATUS;
  }
  static get PROMOTION_STATUS_PARSE() {
    return PROMOTION_STATUS_PARSE;
  }

  static get PROMOTION_BONUS_LIMIT() {
    return PROMOTION_BONUS_LIMIT;
  }
  static get PROMOTION_BONUS_LIMIT_PARSE() {
    return PROMOTION_BONUS_LIMIT_PARSE;
  }

  static get PROMOTION_LIMIT() {
    return PROMOTION_LIMIT;
  }
  static get PROMOTION_LIMIT_PARSE() {
    return PROMOTION_LIMIT_PARSE;
  }
  static get PROMOTION_REQUEST_STATUS() {
    return PROMOTION_REQUEST_STATUS;
  }
  static get PROMOTION_REQUEST_STATUS_PARSE() {
    return PROMOTION_REQUEST_STATUS_PARSE;
  }

  static get HISTORY_ACTION_TYPE() {
    return HISTORY_ACTION_TYPE;
  }
  static get HISTORY_ACTION_TYPE_PARSE() {
    return HISTORY_ACTION_TYPE_PARSE;
  }
}

export default RewardEnum;
