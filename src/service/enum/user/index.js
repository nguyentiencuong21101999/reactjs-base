import Localize from "service/localize"

const USER_STATUS = {
    ALL: -1,
    ACTIVE: 1,
    LOCKED_BY_ADMIN: 2,
    LOCKED_BY_WRONG_PASSWORD_MANY_TIME: 3
}

const USER_STATUS_PARSE = {
    [USER_STATUS.ALL]: Localize.getLocalize("LC_ALL"),
    [USER_STATUS.ACTIVE]:  Localize.getLocalize("LC_STATUS_ACTIVE"),
    [USER_STATUS.LOCKED_BY_ADMIN]: Localize.getLocalize("LC_STATUS_BLOCKED"),
    [USER_STATUS.LOCKED_BY_WRONG_PASSWORD_MANY_TIME]: Localize.getLocalize("LC_STATUS_TEMP_BLOCKED")
}

const GENDER = {
    FEMALE: 0,
    MALE: 1,
}

const GENDER_PARSE = {
    [GENDER.FEMALE]: Localize.getLocalize("LC_GENDER_FM"),
    [GENDER.MALE]: Localize.getLocalize("LC_GENDER_M"),
}

const USER_TYPE = {    
  USER: 2,
  SOCIAL: 3,
}

const USER_TYPE_PARSE = {
    [USER_TYPE.USER]: "Info",
    [USER_TYPE.SOCIAL]: "Social",
}
class AdminEnum {
    static get USER_STATUS() { return USER_STATUS }
    static get USER_STATUS_PARSE() { return USER_STATUS_PARSE }
    static get ADMIN_FIELD() { return ADMIN_FIELD }
    static get GENDER() { return GENDER}
    static get GENDER_PARSE() { return GENDER_PARSE}
    static get USER_TYPE() { return USER_TYPE}
    static get USER_TYPE_PARSE() { return USER_TYPE_PARSE}
}

export default AdminEnum