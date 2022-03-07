import Localize from "service/localize"

const SHOW_IN_INJECT_SCHEDULE = {
    HIDDEN: 0,
    SHOW: 1
}

const SHOW_IN_INJECT_SCHEDULE_PARSE = {
    [SHOW_IN_INJECT_SCHEDULE.HIDDEN]: Localize.getLocalize("LC_NO"),
    [SHOW_IN_INJECT_SCHEDULE.SHOW]: Localize.getLocalize("LC_YES"),
}

const TARGET = {
    PLANNING_A_PREGNANCY: 1,
    PREGNANCY_TRACKING: 2,
    HAD_A_BABY: 3,
}

const TARGET_PARSE = {
    [TARGET.PLANNING_A_PREGNANCY]: Localize.getLocalize("LC_TARGET_PREPARE"),
    [TARGET.PREGNANCY_TRACKING]: Localize.getLocalize("LC_TARGET_PREGNANT"),
    [TARGET.HAD_A_BABY]: Localize.getLocalize("LC_TARGET_BABY"),
}

const SHOW = {
    ALL: -1,
    HIDDEN: 0,
    SHOW_BY_START_DATE: 1,
    SHOW_BY_START_AND_END_DATE: 2
}

const SHOW_PARSE = {
    [SHOW.ALL]: Localize.getLocalize("LC_ALL"),
    [SHOW.HIDDEN]: Localize.getLocalize("LC_HIDE"),
    [SHOW.SHOW_BY_START_DATE]: Localize.getLocalize("LC_FIXED"),
    [SHOW.SHOW_BY_START_AND_END_DATE]: Localize.getLocalize("LC_DURATION")
}

const CATEGORY_ID = {
    NEWS: 1,
    ADVERTISEMENT: 2,
    TO_DO_LIST: 3,
    MENU: 4,
    OTHER: 5
}

const CATEGORY_ID_PARSE = {
    [CATEGORY_ID.NEWS]: "Tin tức",
    [CATEGORY_ID.ADVERTISEMENT]: "Quảng cáo",
    [CATEGORY_ID.TO_DO_LIST]: "Việc cần làm",
    [CATEGORY_ID.MENU]: "Menu-Chế độ ăn",
    [CATEGORY_ID.OTHER]: "Khác"
}



const SOCIAL_POST_STATUS = {
    ALL: -1,
    CREATED_BY_USER: 1,
    CREATED_BY_ADMIN: 2,
    UPDATED_BY_ADMIN: 3,
    ACCEPTED_BY_ADMIN: 4,
    DELETED_BY_ADMIN: 5,
    DELETED_BY_USER: 6
}

const SOCIAL_POST_STATUS_PARSE = {
    [SOCIAL_POST_STATUS.ALL]: Localize.getLocalize("LC_ALL"),
    [SOCIAL_POST_STATUS.CREATED_BY_USER]: Localize.getLocalize("LC_STATUS_SHOWING"),
    [SOCIAL_POST_STATUS.CREATED_BY_ADMIN]: Localize.getLocalize("LC_STATUS_NEW_WAITING_APPROVE"),
    [SOCIAL_POST_STATUS.UPDATED_BY_ADMIN]: Localize.getLocalize("LC_STATUS_UPDATED"),
    [SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN]: Localize.getLocalize("LC_STATUS_APPROVED"),
    [SOCIAL_POST_STATUS.DELETED_BY_ADMIN]: Localize.getLocalize("LC_STATUS_REMOVED_BY_ADMIN"),
    [SOCIAL_POST_STATUS.DELETED_BY_USER]: Localize.getLocalize("LC_STATUS_DELETED")
}

const USER_TYPE = {
    ROOT: 0,
    ADMIN: 1,
    USER: 2,
    SOCIAL: 3,
}

const SOCIAL_POST_SELECT_AUDIENCE = {
    ALL: -1,
    PRIVATE: 0,
    PUBLIC: 1,
    FOLLOWER: 2
}

const SOCIAL_POST_SELECT_AUDIENCE_PARSE = {
    [SOCIAL_POST_SELECT_AUDIENCE.ALL]: Localize.getLocalize("LC_ALL"),
    //[SOCIAL_POST_SELECT_AUDIENCE.PRIVATE]: 'Riêng tư',
    [SOCIAL_POST_SELECT_AUDIENCE.PUBLIC]: Localize.getLocalize("LC_MODE_PUBLIC"),
    [SOCIAL_POST_SELECT_AUDIENCE.FOLLOWER]: Localize.getLocalize("LC_MODE_FOLLOWER")
}
const TOPIC = {
    KNOW: 1,
    CHALLENGE: 2,
    OTHER:3
  }

const TOPIC_PARSE = {
    [TOPIC.KNOW]: Localize.getLocalize("LC_NEED_TO_KNOW"),
    [TOPIC.CHALLENGE]: Localize.getLocalize("LC_CHALLENGE"),
    [TOPIC.OTHER]: Localize.getLocalize("LC_OTHER"),
  }


class AdminEnum {
    static get SHOW_IN_INJECT_SCHEDULE() { return SHOW_IN_INJECT_SCHEDULE }
    static get SHOW_IN_INJECT_SCHEDULE_PARSE() { return SHOW_IN_INJECT_SCHEDULE_PARSE }
    static get CATEGORY_ID() { return CATEGORY_ID }
    static get CATEGORY_ID_PARSE() { return CATEGORY_ID_PARSE }
    static get TARGET() { return TARGET }
    static get TARGET_PARSE() { return TARGET_PARSE }
    static get SHOW() { return SHOW }
    static get SHOW_PARSE() { return SHOW_PARSE }
    static get SOCIAL_POST_STATUS() { return SOCIAL_POST_STATUS }
    static get SOCIAL_POST_STATUS_PARSE() { return SOCIAL_POST_STATUS_PARSE }
    static get USER_TYPE() { return USER_TYPE }
    static get SOCIAL_POST_SELECT_AUDIENCE() { return SOCIAL_POST_SELECT_AUDIENCE }
    static get SOCIAL_POST_SELECT_AUDIENCE_PARSE() { return SOCIAL_POST_SELECT_AUDIENCE_PARSE }

    static get TOPIC() { return TOPIC }
    static get TOPIC_PARSE() { return TOPIC_PARSE }

}

export default AdminEnum