import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import View from "./view";
import ModelTable from "core/table/model";
import UserEnum from "service/enum/user";
import SearchEnum from "service/enum/search";
import RouteEnum from "service/enum/route";
import Helper from "service/helper";
import { ModelView } from "./model";
import Localize from "service/localize";

class ListUserComponent extends Component {
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
        defaultOrderBy: {
          [UserEnum.USER_TYPE.USER]: {},
          [UserEnum.USER_TYPE.SOCIAL]: {},
        },
        listStatus: [
          {
            text: UserEnum.USER_STATUS_PARSE[UserEnum.USER_STATUS.ALL],
            value: UserEnum.USER_STATUS.ALL,
          },
          {
            text: UserEnum.USER_STATUS_PARSE[UserEnum.USER_STATUS.ACTIVE],
            value: UserEnum.USER_STATUS.ACTIVE,
          },
          {
            text: UserEnum.USER_STATUS_PARSE[UserEnum.USER_STATUS.LOCKED_BY_ADMIN],
            value: UserEnum.USER_STATUS.LOCKED_BY_ADMIN,
          },
          {
            text: UserEnum.USER_STATUS_PARSE[UserEnum.USER_STATUS.LOCKED_BY_WRONG_PASSWORD_MANY_TIME],
            value: UserEnum.USER_STATUS.LOCKED_BY_WRONG_PASSWORD_MANY_TIME,
          },
        ],
        defaultStatus: {
          [UserEnum.USER_TYPE.USER]: {},
          [UserEnum.USER_TYPE.SOCIAL]: {},
        },
        listSearch: {
          [UserEnum.USER_TYPE.USER]: [
            {
              text: Localize.getLocalize("LC_ID_ACCOUNT"),
              value: 'userId'
            },
            {
              text: Localize.getLocalize("LC_FULLNAME"),
              value: "fullName",
            },
            {
              text: Localize.getLocalize("LC_PHONE"),
              value: "phoneNumber",
            },
            {
              text: Localize.getLocalize("LC_USERNAME"),
              value: "username",
            },
            {
              text: Localize.getLocalize("LC_EMAIL"),
              value: "email",
            },
          ],
          [UserEnum.USER_TYPE.SOCIAL]: [
            {
              text: Localize.getLocalize("LC_ID_ACCOUNT"),
              value: 'userId'
            },
            {
              text: Localize.getLocalize("LC_FULLNAME"),
              value: "fullName",
            },
            {
              text: Localize.getLocalize("LC_PHONE"),
              value: "phoneNumber",
            },
            {
              text: Localize.getLocalize("LC_EMAIL"),
              value: "email",
            },
          ],
        },
        defaultSearch: {
          [UserEnum.USER_TYPE.USER]: {},
          [UserEnum.USER_TYPE.SOCIAL]: {},
        },
        dataTable: {
          [UserEnum.USER_TYPE.USER]: {},
          [UserEnum.USER_TYPE.SOCIAL]: {},
        },
        searchInput: {
          [UserEnum.USER_TYPE.USER]: null,
          [UserEnum.USER_TYPE.SOCIAL]: null,
        },
        list: {
          [UserEnum.USER_TYPE.USER]: null,
          [UserEnum.USER_TYPE.SOCIAL]: null,
        },
        tab: {
          current: UserEnum.USER_TYPE.USER,
          user: UserEnum.USER_TYPE.USER,
          social: UserEnum.USER_TYPE.SOCIAL,
        },
        searchValue: {
          [UserEnum.USER_TYPE.USER]: "",
          [UserEnum.USER_TYPE.SOCIAL]: "",
        },
        total: {
          [UserEnum.USER_TYPE.USER]: 0,
          [UserEnum.USER_TYPE.SOCIAL]: 0,
        },
        isChangeSearch: false,
        resetPage: true,
      },
      func: {
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
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
  }

  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("ListUserComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { state } = this.props.location
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)

      Object.keys(ui.defaultOrderBy).forEach((key) => {
        ui.defaultOrderBy[key] = ui.listOrderBy[0];
      });
      Object.keys(ui.defaultStatus).forEach((key) => {
        ui.defaultStatus[key] = ui.listStatus[0];
      });
      Object.keys(ui.defaultSearch).forEach((key) => {
        ui.defaultSearch[key] = ui.listSearch[key][0];
      });
      Object.keys(ui.searchInput).forEach((key) => {
        ui.searchInput[key] = ui.defaultSearch[key].value;
      });

      Object.keys(ui.dataTable).forEach((key) => {
        ui.dataTable[key] = new ModelTable().setField(["status"]).setOrderBy("desc").setValue([UserEnum.USER_STATUS.ALL]);
      });
      data["status"] = UserEnum.USER_STATUS.ALL;
    } catch (e) {
      Logger.error(`ListUserComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("ListUserComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`ListUserComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("ListUserComponent execute handleRequest");
      const { ui, timeout } = this.state;
      // const { getList } = this.props
      // const payload = ui.dataTable[ui.tab.current].setField(['status'])
      //                     .setValue(['null'])
      //                     .setOrderBy("desc")
      // getList(timeout.key, payload)
    } catch (e) {
      Logger.error(`ListUserComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListUserComponent execute handleOnChangeTableValue");
      Logger.debug("ListUserComponent execute handleOnChangeTableValue receive query", query);
      const { ui, data } = this.state;
      ui.list[ui.tab.current] = null;
      ui.resetPage = false;
      const searchRequest = this.handleSearchRequest();
      ui.dataTable[ui.tab.current] = query.setField(searchRequest.field).setValue(searchRequest.value).setOrderBy(data["orderBy"]);
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChangeTableValue ${e.toString()}`);
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
      Logger.error(`ListUserComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("ListUserComponent execute handleOnChange");
      Logger.debug("ListUserComponent execute handleOnChange receive name", name);
      Logger.debug("ListUserComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      switch (name) {
        case "orderBy":
          data[name] = value;
          break;
        case "status":
          data[name] = value;
          break;
        case "searchValue":
          let temp = { ...data };
          delete temp["orderBy"];
          delete temp["status"];
          Object.keys(temp).forEach((key) => {
            temp[key] = undefined;
          });
          temp[ui.searchInput[ui.tab.current]] = value;
          Object.keys(temp).forEach((key) => {
            data[key] = temp[key];
          });
          break;
      }
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info("ListUserComponent execute handleOnChangeSearch");
      Logger.debug("ListUserComponent execute handleOnChangeSearch receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      ui.isChangeSearch = !ui.isChangeSearch;
      ui.searchInput[ui.tab.current] = value;
      const now = new Date();
      if (value == "createdAt") {
        this.handleOnChangeSearchValue("createdAt", now);
      } else {
        this.handleOnChangeSearchValue(value, "");
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChangeSearch ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info("ListUserComponent execute handleOnChangeSearchValue");
      Logger.debug("ListUserComponent execute handleOnChangeSearchValue receive value", value);
      const { ui } = this.state;

      ui.searchValue[ui.tab.current] = !Helper.isEmpty(value) ? value : "";
      let temp = !Helper.isEmpty(value) ? value : null;

      this.handleOnChange("searchValue", temp);
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChangeSearchValue ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeStatus(event, value) {
    try {
      Logger.info("ListUserComponent execute handleOnChangeStatus");
      Logger.debug("ListUserComponent execute handleOnChangeStatus receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("status", value);
      ui.defaultStatus[ui.tab.current] = ui.listStatus.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info("ListUserComponent execute handleOnChangeOrderBy");
      Logger.debug("ListUserComponent execute handleOnChangeOrderBy receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("orderBy", value);
      ui.defaultOrderBy[ui.tab.current] = ui.listOrderBy.find((item) => item.value === value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleOnChangeOrderBy ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListUserComponent execute handleSetData");
      Logger.debug("ListUserComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list[ui.tab.current] = data.list;
      ui.total[ui.tab.current] = data.total;
      Logger.debug("ListUserComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListUserComponent handleSetData ${e.toString()}`);
    }
  }
  handleSearchRequest() {
    try {
      Logger.info("ListUserComponent execute handleSearchRequest");
      const { ui, data } = this.state;
      Logger.debug("ListUserComponent execute handleSearchRequest receive", data);
      let temp = { ...data };
      delete temp["orderBy"];
      let field = [],
        value = [];
      Object.keys(temp).forEach((key) => {
        if (!Helper.isEmpty(temp[key])) {
          value.push(temp[key]);
          field.push(key);
        }
      });
      return { field, value };
    } catch (e) {
      Logger.error(`ListUserComponent handleSearchRequest ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListUserComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault();
      }
      const { ui, timeout, data } = this.state;
      ui.list[ui.tab.current] = null;
      ui.resetPage = true;

      const searchRequest = this.handleSearchRequest();
      ui.dataTable[ui.tab.current] = ui.dataTable[ui.tab.current].setField(searchRequest.field).setValue(searchRequest.value).setOrderBy(data.orderBy).setFrom(0);
      Logger.debug("ListUserComponent execute handleSubmitSearch data", data);
      Logger.debug("ListUserComponent execute handleSubmitSearch dataTable", ui.dataTable[ui.tab.current]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info("ListUserComponent execute handleCreate");
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.CREATE);
    } catch (e) {
      Logger.error(`ListUserComponent handleCreate ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info("ListUserComponent execute handleRedirectDetail");
      Logger.debug("ListUserComponent execute handleRedirectDetail recieve item", item);
      const { ui } = this.state;
      let route = RouteEnum.PAGE.MANAGE_ACCOUNT.USER.DETAIL;
      const path = route.replace(":id", item.userId);
      item.tab = ui.tab.current
      this.handleRedirectWithState(path, item);
    } catch (e) {
      Logger.error(`ListUserComponent handleRedirectDetail ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info("ListUserComponent execute handleChangeTab");
      Logger.debug("ListUserComponent execute handleChangeTab recieve value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      switch (value) {
        case `${UserEnum.USER_TYPE.USER}`:
          ui.tab.current = ui.tab.user;
          break;
        case `${UserEnum.USER_TYPE.SOCIAL}`:
          ui.tab.current = ui.tab.social;
          break;
      }
      let temp = { ...data };
      delete temp["orderBy"];
      delete temp["status"];
      Object.keys(temp).forEach((key) => {
        temp[key] = undefined;
        data[key] = undefined;
      });
      ui.searchInput[ui.tab.current] = ui.listSearch[ui.tab.current][0].value;
      ui.searchValue[ui.tab.current] = "";
      this.setState({ ui });
      this.handleSubmitSearch(event);
    } catch (e) {
      Logger.error(`ListUserComponent handleChangeTab ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }



  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue} timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOrderBy={this.handleOnChangeOrderBy} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate} handleRedirectDetail={this.handleRedirectDetail} handleChangeTab={this.handleChangeTab} />;
  }
}

export default BaseComponent(ListUserComponent);
