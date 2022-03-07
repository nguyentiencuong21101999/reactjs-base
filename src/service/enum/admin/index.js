import Localize from 'service/localize';
const ADMIN_TEMP_STATUS = {
    INIT: 0,
    ADMIN_CREATED: 1,
}

const ADMIN_STATUS = {
    ALL: -1,
    ACTIVE: 1,
    BAN: 2,
}

const ADMIN_STATUS_PARSE = {
    [ADMIN_STATUS.ALL]: Localize.getLocalize("LC_ALL"),
    [ADMIN_STATUS.ACTIVE]: Localize.getLocalize("LC_STATUS_ACTIVE"),
    [ADMIN_STATUS.BAN]: Localize.getLocalize("LC_STATUS_BLOCKED")
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
    ROOT: 0,
    ADMIN: 1,
}

const USER_TYPE_PARSE = {
    [USER_TYPE.ROOT]: "Root account",
    [USER_TYPE.ADMIN]: "Admin account",
}
class AdminEnum {
    static get ADMIN_STATUS() { return ADMIN_STATUS }
    static get ADMIN_STATUS_PARSE() { return ADMIN_STATUS_PARSE }
    static get ADMIN_FIELD() { return ADMIN_FIELD }
    static get GENDER() { return GENDER}
    static get GENDER_PARSE() { return GENDER_PARSE}
    static get USER_TYPE() { return USER_TYPE}
    static get USER_TYPE_PARSE() { return USER_TYPE_PARSE}
    static get ADMIN_TEMP_STATUS() { return ADMIN_TEMP_STATUS}
}

export default AdminEnum