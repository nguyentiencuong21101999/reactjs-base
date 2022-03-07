
import Localize from 'service/localize';
const TABLE = {
    USER: "user"
}

const FILTER = {
    DESC: "desc",
    ASC: "asc",
}

const FILTER_PARSE = {
    [FILTER.DESC]: Localize.getLocalize("LC_SORT_BY_NEWEST"),
    [FILTER.ASC]: Localize.getLocalize("LC_SORT_BY_OLDEST"),
}

const FILTER_MEMBER = {
    DESC: "desc",
    ASC: "asc",
}

const FILTER_MEMBER_PARSE = {
    [FILTER.DESC]: Localize.getLocalize("LC_SORT_BY_MOST_POINT"),
    [FILTER.ASC]: Localize.getLocalize("LC_SORT_BY_LEAST_POINT"),
}
const FILTER_PARTICIPANT_POST = {
    DESC: "desc",
    ASC: "asc",
}

const FILTER_PARTICIPANT_POST_PARSE = {
    [FILTER.DESC]: Localize.getLocalize("LC_SORT_BY_HIGHEST"),
    [FILTER.ASC]: Localize.getLocalize("LC_SORT_BY_LOWEST"),
}

class SearchEnum {
    static get TABLE() { return TABLE }
    static get FILTER() { return FILTER }
    static get FILTER_PARSE() { return FILTER_PARSE }
    static get FILTER_MEMBER() { return FILTER_MEMBER }
    static get FILTER_MEMBER_PARSE() { return FILTER_MEMBER_PARSE }
    static get FILTER_PARTICIPANT_POST() { return FILTER_PARTICIPANT_POST }
    static get FILTER_PARTICIPANT_POST_PARSE() { return FILTER_PARTICIPANT_POST_PARSE }
}

export default SearchEnum