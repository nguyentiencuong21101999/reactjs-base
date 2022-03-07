import Localize from "service/localize"

//challenge
const DIRECT_TO = {
    KNOW: 1,
    NOTE_BOOK: 2,
    FOLLOW_BABY: 3,
    TEACHING_PREGNANCY: 4,
    CHALLENGE: 5,
    LOYALTY: 6
}
const DIRECT_TO_PARSE = {
    [DIRECT_TO.KNOW]:Localize.getLocalize("LC_NEED_TO_KNOW"),
    [DIRECT_TO.NOTE_BOOK]: Localize.getLocalize("LC_NOTEBOOK"),
    [DIRECT_TO.FOLLOW_BABY]: Localize.getLocalize("LC_TARGET_BABY"),
    [DIRECT_TO.TEACHING_PREGNANCY]: Localize.getLocalize("LC_PRENATAL_EDU"),
    [DIRECT_TO.CHALLENGE]: Localize.getLocalize("LC_CHALLENGE"),
    [DIRECT_TO.LOYALTY]: Localize.getLocalize("LC_ACCUMULATE_POINTS_AND_REDEEM_REWARDS"),
}




class SettingEnum {
    static get DIRECT_TO() { return DIRECT_TO }
    static get DIRECT_TO_PARSE() { return DIRECT_TO_PARSE }

}

export default SettingEnum