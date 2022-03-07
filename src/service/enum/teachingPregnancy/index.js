import Localize from "service/localize"

const SUBJECT = {
   MOM:1,
   BABY:2
}

const SUBJECT_PARSE = {
    [SUBJECT.MOM]: Localize.getLocalize("LC_MOM"),
    [SUBJECT.BABY]: Localize.getLocalize("LC_BABY"),
    
}

const MONTH = {
    ALL:-1,
    FIRST:1,
    SECOND:2,
    THIRD:3,
    FOURTH:4,
    FIFTH:5,
    SIXTH:6,
    SEVENTH:7,
    EIGHTH:8,
    NINTH:9,
    TENTH:10
}
const MONTH_PARSE = {
    [MONTH.ALL]:Localize.getLocalize("LC_ALL"),
    [MONTH.FIRST]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.FIRST}`,
    [MONTH.SECOND]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.SECOND}`,
    [MONTH.THIRD]:`${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.THIRD}`,
    [MONTH.FOURTH]:`${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.FOURTH}`,
    [MONTH.FIFTH]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.FIFTH}`,
    [MONTH.SIXTH]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.SIXTH}`,
    [MONTH.SEVENTH]:`${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.SEVENTH}` ,
    [MONTH.EIGHTH]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.EIGHTH}`,
    [MONTH.NINTH]: `${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.NINTH}`,
    [MONTH.TENTH]:`${Localize.getLocalize("LC_UNIT_MONTH_TH")} ${MONTH.TENTH}`,
}


class TeachingPregnancy {
    static get SUBJECT() { return SUBJECT }
    static get SUBJECT_PARSE() { return SUBJECT_PARSE }
    static get MONTH() { return MONTH }
    static get MONTH_PARSE() { return MONTH_PARSE }
}

export default TeachingPregnancy