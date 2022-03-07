import Localize from "service/localize"

const STATUS = {
    ALL:-1,
    NEW: 1,
    APPLIED: 2
}

const STATUS_PARSE = {
    [STATUS.ALL]:Localize.getLocalize("LC_ALL"),
    [STATUS.NEW]: Localize.getLocalize("LC_NOT_APPLY"),
    [STATUS.APPLIED]: Localize.getLocalize("LC_APPLY")
}



class AdminEnum {
    static get STATUS() { return STATUS }
    static get STATUS_PARSE() { return STATUS_PARSE }
    
}

export default AdminEnum