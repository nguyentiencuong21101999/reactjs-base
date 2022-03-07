import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import View from "./view";
import ModelTable from "core/table/model";
import SearchEnum from "service/enum/search";
import RouteEnum from "service/enum/route";

import Helper from "service/helper";
import { ModelView } from "./model";
import ChallengeEnum from "service/enum/challenge";
import RewardEnum from 'service/enum/reward'
import HelperService from "service/helper";
import DialogModel from "component/layout/dialog/model";
import DialogEnum from "service/enum/dialog";
import Localize from "service/localize";
class ListHistoryPointComponent extends Component {
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
        listSearch: [
          {
            text: Localize.getLocalize("LC_DESCRIPTION"),
            value: "pointHistory.description",
          }
        ],
        defaultSearch: {},
        searchInput: null,
        searchValue: "",
        resetPage: true,

        detailReward: null,
        dataTable: null,
        list: null,
        total: null,
      },
      func: {
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      },
    };
    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleSetData = this.handleSetData.bind(this);
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this);
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleUpdateListRequest = this.handleUpdateListRequest.bind(this);
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("ListHistoryPointComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { detailMember } = this.props;
      ui.dataTable = new ModelTable().setWhat("pointHistory").setOrder("createdAt").setBy("asc");
      ui.dataTable.userId = detailMember.userId;
      //default orderBy
      ui.defaultOrderBy = ui.listOrderBy[0];
      ui.defaultSearch = ui.listSearch[0];
      ui.searchInput = ui.defaultSearch.value;

      data["search"] = "pointHistory.description";
      data["filterValue"] = undefined;
    } catch (e) {
      Logger.error(`ListHistoryPointComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("ListHistoryPointComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`ListHistoryPointComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("ListHistoryPointComponent execute handleRequest");
      const { ui, timeout } = this.state;
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
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
      Logger.error(`ListHistoryPointComponent handleOnRef ${e.toString()}`);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListHistoryPointComponent execute handleSetData");
      Logger.debug("ListHistoryPointComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      //Logger.debug("ListHistoryPointComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleSetData ${e.toString()}`);
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChangeTableValue");
      Logger.debug("ListHistoryPointComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state;
      ui.resetPage = false;
      ui.list = null;
      ui.dataTable.limit = query.limit;
      ui.dataTable.from = query.from;
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChange");
      Logger.debug("ListHistoryPointComponent execute handleOnChange receive name", name);
      Logger.debug("ListHistoryPointComponent execute handleOnChange receive value", value);
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
      }
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChangeOrderBy");
      Logger.debug("ListHistoryPointComponent execute handleOnChangeOrderBy receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("by", value);
      ui.defaultOrderBy = ui.listOrderBy.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChangeOrderBy ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeStatus(event, value) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChangeStatus");
      Logger.debug("ListHistoryPointComponent execute handleOnChangeStatus receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      if (value === ChallengeEnum.USER_CHALLENGE_STATUS.ALL) {
        this.handleOnChange("filter", undefined);
        this.handleOnChange("filterValue", undefined);
      } else {
        this.handleOnChange("filter", "pointHistory.action");
        this.handleOnChange("filterValue", value);
      }

      ui.defaultStatus = ui.listStatus.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSearch(event, value) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChangeSearch");
      Logger.debug("ListHistoryPointComponent execute handleOnChangeSearch receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      ui.searchInput = value;
      this.handleOnChange("search", value);
      this.handleOnChangeSearchValue(value, ""); // set default

      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChangeSearch ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info("ListHistoryPointComponent execute handleOnChangeSearchValue");
      Logger.debug("ListHistoryPointComponent execute handleOnChangeSearchValue receive value", value);
      // if(event){
      //   event.preventDefault()
      // }
      const { ui, data } = this.state;
      ui.searchValue = !Helper.isEmpty(value) ? value : "";
      let temp = !Helper.isEmpty(value) ? value : undefined;
      this.handleOnChange("searchValue", temp);
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleOnChangeSearchValue ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleSubmitSearch(event) {
    try {
      Logger.info("ListPostComponent execute handleSubmitSearch");
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
      Logger.debug("ListPostComponent execute handleSubmitSearch data", data);
      Logger.debug("ListPostComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListPostComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleUpdateListRequest(event, item, index) {
    try {
      Logger.info("ListHistoryPointComponent execute handleUpdateListRequest");

      const { updateModal } = this.props;
      const dialog = new DialogModel();
      dialog.setView(DialogEnum.VIEW.UPDATE_LIST_REQUEST);
      dialog.setTitle("Cập nhật trạng thái");
      dialog.setContent({ requestId: item.requestId, status: item.status });
      dialog.setHandleConfirm((data) => {
        this.handleUpdateListRequestSuccess(data,index);
      });
      updateModal(dialog);
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleUpdateListRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateListRequestSuccess(data, index) {
    try {
      Logger.info("ListHistoryPointComponent execute handleUpdateListRequest");
      const { ui } = this.state;
      ui.list[index].status = data.status;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListHistoryPointComponent handleUpdateListRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} timeout={timeout} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleOnChangeTableValue={this.handleOnChangeTableValue} handleOnChangeOrderBy={this.handleOnChangeOrderBy} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleSubmitSearch={this.handleSubmitSearch} handleUpdateListRequest={this.handleUpdateListRequest} />;
  }
}

export default BaseComponent(ListHistoryPointComponent);
