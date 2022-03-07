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
import RewardEnum from "service/enum/reward";
import HelperService from "service/helper";
import DialogModel from "component/layout/dialog/model";
import DialogEnum from "service/enum/dialog";
import Localize from "service/localize";
class ListRequestComponent extends Component {
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
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.ALL],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.ALL,
          },
          {
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.NEW],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.NEW,
          },
          {
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING,
          },
          {
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.DONE],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.DONE,
          },
        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_FULLNAME"),
            value: "userInfo.fullName",
          },
          {
            text: Localize.getLocalize("LC_PHONE"),
            value: "userInfo.phoneNumber",
          },
          {
            text: Localize.getLocalize("LC_EMAIL"),
            value: "userInfo.email",
          },
          {
            text: Localize.getLocalize("LC_ID_ACCOUNT"),
            value: "userInfo.userId",
          },
          {
            text: Localize.getLocalize("LC_ID_CUSTOMER_REWARD"),
            value: "userPromotionRequest.requestId",
          },
        ],
        defaultSearch: {},
        searchInput: null,
        searchValue: "",
        resetPage: true,
        isChangeSearch: false,
        detailReward: null,
        dataTable: null,
        list: null,
        total: null,
      },
      func: {
        handleGetListAdminSuccess: this.handleGetListAdminSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
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
      Logger.info("listParticipantComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { detailReward } = this.props;
      ui.dataTable = new ModelTable().setWhat("userPromotionRequest").setOrder("createdAt").setBy("asc");
      ui.dataTable.proId = detailReward.promotionResp.proId;
      //default orderBy
      ui.defaultOrderBy = ui.listOrderBy[0];
      ui.defaultStatus = ui.listStatus[0];
      ui.defaultSearch = ui.listSearch[0];
      ui.searchInput = ui.defaultSearch.value;

      data["search"] = "userInfo.fullName";
      data["filterValue"] = undefined;
    } catch (e) {
      Logger.error(`listParticipantComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("listParticipantComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`listParticipantComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("listParticipantComponent execute handleRequest");
      const { ui, timeout } = this.state;
    } catch (e) {
      Logger.error(`listParticipantComponent handleRequest ${e.toString()}`);
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
      Logger.error(`listParticipantComponent handleOnRef ${e.toString()}`);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("listParticipantComponent execute handleSetData");
      Logger.debug("listParticipantComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;

      //Logger.debug("listParticipantComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`listParticipantComponent handleSetData ${e.toString()}`);
    }
  }

  handleGetListAdminSuccess(response) {
    try {
      Logger.info("listParticipantComponent execute handleGetListAdminSuccess");
      Logger.debug("listParticipantComponent execute handleGetListAdminSuccess receive response", response);
      const { ui, timeout } = this.state;
      this.handleSetData(response);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`listParticipantComponent handleGetListAdminSuccess ${e.toString()}`);
    }
  }
  handleOnChangeTableValue(query) {
    try {
      Logger.info("listParticipantComponent execute handleOnChangeTableValue");
      Logger.debug("listParticipantComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state;
      ui.resetPage = false;
      ui.list = null;
      ui.dataTable.limit = query.limit;
      ui.dataTable.from = query.from;
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info("listParticipantComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, "all", "Hệ thống đang lỗi vui lòng thử lại sau");
    } catch (e) {
      Logger.error(`listParticipantComponent handleSubmit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("listParticipantComponent execute handleOnChange");
      Logger.debug("listParticipantComponent execute handleOnChange receive name", name);
      Logger.debug("listParticipantComponent execute handleOnChange receive value", value);
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
      Logger.error(`listParticipantComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info("listParticipantComponent execute handleOnChangeOrderBy");
      Logger.debug("listParticipantComponent execute handleOnChangeOrderBy receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("by", value);
      ui.defaultOrderBy = ui.listOrderBy.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeOrderBy ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeStatus(event, value) {
    try {
      Logger.info("listParticipantComponent execute handleOnChangeStatus");
      Logger.debug("listParticipantComponent execute handleOnChangeStatus receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      if (value === RewardEnum.PROMOTION_REQUEST_STATUS.ALL) {
        this.handleOnChange("filter", undefined);
        this.handleOnChange("filterValue", undefined);
      } else {
        this.handleOnChange("filter", "userPromotionRequest.status");
        this.handleOnChange("filterValue", value);
      }

      ui.defaultStatus = ui.listStatus.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSearch(event, value) {
    try {
      Logger.info("listParticipantComponent execute handleOnChangeSearch");
      Logger.debug("listParticipantComponent execute handleOnChangeSearch receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      ui.isChangeSearch = !ui.isChangeSearch;
      ui.searchInput = value;
      this.handleOnChange("search", value);
      this.handleOnChangeSearchValue(value, ""); // set default

      this.setState({ ui });
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeSearch ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info("listParticipantComponent execute handleOnChangeSearchValue");
      Logger.debug("listParticipantComponent execute handleOnChangeSearchValue receive value", value);
      // if(event){
      //   event.preventDefault()
      // }
      const { ui, data } = this.state;
      ui.searchValue = !Helper.isEmpty(value) ? value : "";
      let temp = !Helper.isEmpty(value) ? value : undefined;
      this.handleOnChange("searchValue", temp);
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeSearchValue ${e.toString()}`);
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
      Logger.info("ListRequestComponent execute handleUpdateListRequest");

      const { updateModal } = this.props;
      const dialog = new DialogModel();
      dialog.setView(DialogEnum.VIEW.UPDATE_LIST_REQUEST)
      dialog.setContent({ requestId: item.requestId, status: item.status });
      dialog.setHandleConfirm((data) => {
        this.handleUpdateListRequestSuccess(data, index);
      });
      updateModal(dialog);
    } catch (e) {
      Logger.error(`ListRequestComponent handleUpdateListRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateListRequestSuccess(data, index) {
    try {
      Logger.info("ListRequestComponent execute handleUpdateListRequest");
      const { ui } = this.state;
      ui.list[index].status = data.status;
      ui.list[index].modifiedAt = data.modifiedAt;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListRequestComponent handleUpdateListRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} timeout={timeout} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleOnChangeTableValue={this.handleOnChangeTableValue} handleOnChangeOrderBy={this.handleOnChangeOrderBy} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleSubmitSearch={this.handleSubmitSearch} handleUpdateListRequest={this.handleUpdateListRequest} />;
  }
}

export default BaseComponent(ListRequestComponent);
