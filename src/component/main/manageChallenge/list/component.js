import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import View from "./view";
import ModelTable from "core/table/model";
import ChallengeEnum from "service/enum/challenge";
import SearchEnum from "service/enum/search";
import RouteEnum from "service/enum/route";
import Helper from "service/helper";
import { ModelView } from "./model";
import HelperService from "service/helper";
import Localize from "service/localize";
class ListChallengeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      ui: {
        listOrderBy: [
          {
            text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.DESC],
            value: SearchEnum.FILTER.DESC,
          },
          {
            text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.ASC],
            value: SearchEnum.FILTER.ASC,
          },
        ],
        defaultOrderBy: {},
        listStatus: [
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.ALL],
            value: ChallengeEnum.STATUS.ALL,
          },
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.NEW],
            value: ChallengeEnum.STATUS.NEW,
          },
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.APPLY],
            value: ChallengeEnum.STATUS.APPLY,
          },
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.START],
            value: ChallengeEnum.STATUS.START,
          },
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.FINISHED],
            value: ChallengeEnum.STATUS.FINISHED,
          },
          {
            text: ChallengeEnum.STATUS_PARSE[ChallengeEnum.STATUS.RESULT],
            value: ChallengeEnum.STATUS.RESULT,
          },

        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_CHALLENGE_NAME"),
            value: "challenge.title",
          },
          {
            text: Localize.getLocalize("LC_STARTDATE"),
            value: "challenge.startDate",
          },
          {
            text: Localize.getLocalize("LC_ENDDATE"),
            value: "challenge.endDate",
          },
        ],
        defaultSearch: {},
        resetPage: true,
        dataTable: null,
        searchInput: null,
        list: null,
        searchValue: "",
        tab: {
          current: 1,
          user: 1,
          admin: 2,
        },
        total: 3,
      },
      func: {
        handleGetListPostSuccess: this.handleGetListPostSuccess.bind(this),
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      },
    };

    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this);
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this);
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleSetData = this.handleSetData.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this);
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("ListChallengeComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;

      ui.defaultOrderBy = ui.listOrderBy[0];
      ui.defaultStatus = ui.listStatus[0];
      ui.defaultSearch = ui.listSearch[0];
      ui.searchInput = ui.defaultSearch.value;

      ui.dataTable = new ModelTable().setWhat("challenge").setOrder("createdAt").setBy("desc");
      data["search"] = "challenge.title";
      data["filterValue"] = undefined;
    } catch (e) {
      Logger.error(`ListChallengeComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("ListChallengeComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`ListChallengeComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("ListChallengeComponent execute handleRequest");
      const { ui, timeout } = this.state;

    } catch (e) {
      Logger.error(`ListChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChangeTableValue");
      Logger.debug("ListChallengeComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state;
      ui.list = null;
      ui.resetPage = false;
      ui.dataTable.limit = query.limit;
      ui.dataTable.from = query.from;
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state;
      ref[name] = element;
      if (name === "username") {
        ref[name].focus();
      }
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChange");
      Logger.debug("ListChallengeComponent execute handleOnChange receive name", name);
      Logger.debug("ListChallengeComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      switch (name) {
        case "by":
        case "filter":
        case "filterValue":
          data[name] = value;
          break;
        case "search":
        case "searchValue":
          data[name] = value;
          break;
          break;
      }
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChangeSearch");
      Logger.debug("ListChallengeComponent execute handleOnChangeSearch receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      ui.searchInput = value;
      this.handleOnChange("search", value);
      this.handleOnChangeSearchValue(value, ""); // set default

      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChangeSearch ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChangeSearchValue");
      Logger.debug("ListChallengeComponent execute handleOnChangeSearchValue receive value", value);
      // if(event){
      //   event.preventDefault()
      // }

      const { ui, data } = this.state;
      ui.searchValue = !Helper.isEmpty(value) ? value : "";
      let temp = !Helper.isEmpty(value) ? value : undefined;
      if (!HelperService.isEmpty(temp)) {
        switch (data["search"]) {
          case "challenge.startDate":
          case "challenge.endDate":
            temp = HelperService.getYearMonthDateYue(new Date(temp));
            break;
          default:
            break;
        }
      }
      this.handleOnChange("searchValue", temp);
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChangeSearchValue ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeStatus(event, value) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChangeStatus");
      Logger.debug("ListChallengeComponent execute handleOnChangeStatus receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      if (value === ChallengeEnum.STATUS.ALL) {
        this.handleOnChange("filter", undefined);
        this.handleOnChange("filterValue", undefined);
      } else {
        this.handleOnChange("filter", "challenge.status");
        this.handleOnChange("filterValue", value);
      }

      ui.defaultStatus = ui.listStatus.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info("ListChallengeComponent execute handleOnChangeOrderBy");
      Logger.debug("ListChallengeComponent execute handleOnChangeOrderBy receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("by", value);
      ui.defaultOrderBy = ui.listOrderBy.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListChallengeComponent handleOnChangeOrderBy ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListChallengeComponent execute handleSetData");
      Logger.debug("ListChallengeComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      Logger.debug("ListChallengeComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListChallengeComponent handleSetData ${e.toString()}`);
    }
  }

  handleGetListPostSuccess(response) {
    try {
      Logger.info("ListChallengeComponent execute handleGetListPostSuccess");
      Logger.debug("ListChallengeComponent execute handleGetListPostSuccess receive response", response);
      const { ui, timeout } = this.state;
      this.handleSetData(response);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListChallengeComponent handleGetListPostSuccess ${e.toString()}`);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListChallengeComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault();
      }
      const { ui, timeout, data } = this.state;
      ui.list = null;
      ui.resetPage = true;
      let temp = { ...data };
      if (HelperService.isEmpty(temp["searchValue"])) {
        temp["search"] = undefined;
        temp["searchValue"] = undefined;
      }
      ui.dataTable = ui.dataTable.setFilter(temp.filter).setFilterValue(temp.filterValue).setSearch(temp.search).setSearchValue(temp.searchValue).setBy(temp.by).setFrom(0);
      Logger.debug("ListChallengeComponent execute handleSubmitSearch data", data);
      Logger.debug("ListChallengeComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListChallengeComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info("ListChallengeComponent execute handleCreate");
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE);
    } catch (e) {
      Logger.error(`ListChallengeComponent handleCreate ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info("ListChallengeComponent execute handleRedirectDetail");
      Logger.debug("ListChallengeComponent execute handleRedirectDetail recieve item", item);
      const { ui } = this.state;
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL;
      const path = route.replace(":id", item.challengeId);
      this.handleRedirectWithState(path, item);
    } catch (e) {
      Logger.error(`ListChallengeComponent handleRedirectDetail ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue} timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOrderBy={this.handleOnChangeOrderBy} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate} handleRedirectDetail={this.handleRedirectDetail} />;
  }
}

export default BaseComponent(ListChallengeComponent);
