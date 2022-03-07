import Localize from "service/localize"

const TAB_LIST_DATA = {
    EXISTED: 1,
    NOT_EXISTS: 2
}
const TAB_LIST_DATA_PARSE = {
    [TAB_LIST_DATA.EXISTED]: Localize.getLocalize("LC_EXISTED_IN_SYSTEM"),
    [TAB_LIST_DATA.NOT_EXISTS]: Localize.getLocalize("LC_NOT_EXISTED_IN_SYSTEM"),
}
const FILTER = {
    ALL: 0,
    EMAIL: 1,
    SMS: 2,
    DEVICE: 3,
}

const FILTER_PARSE = {
    [FILTER.ALL]: Localize.getLocalize("LC_ALL"),
    [FILTER.DEVICE]: Localize.getLocalize("LC_DEVICE"),
    [FILTER.EMAIL]: Localize.getLocalize("LC_EMAIL"),
    [FILTER.SMS]: Localize.getLocalize("LC_SMS"),
}
const NOTIFY_STATUS = {
    SUCCESS: 2,
    FAILED: 3
}
const NOTIFY_STATUS_PARSE = {
    [NOTIFY_STATUS.SUCCESS]: Localize.getLocalize("LC_SUCCESS"),
    [NOTIFY_STATUS.FAILED]: Localize.getLocalize("LC_FAILED")
}
class NotifyEnum {
    static get FILTER() { return FILTER }
    static get FILTER_PARSE() { return FILTER_PARSE }

    static get TAB_LIST_DATA() { return TAB_LIST_DATA }
    static get TAB_LIST_DATA_PARSE() { return TAB_LIST_DATA_PARSE }

    static get NOTIFY_STATUS() { return NOTIFY_STATUS }
    static get NOTIFY_STATUS_PARSE() { return NOTIFY_STATUS_PARSE }
}

export default NotifyEnum