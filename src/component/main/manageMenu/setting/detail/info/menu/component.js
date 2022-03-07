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
import ChallengeEnum from "service/enum/challenge";
import HelperService from "service/helper";
class ListMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      ui: {
        searchValue: "",
        resetPage: true,

        detailChallenge: null,
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
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleSetData = this.handleSetData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("ListMenuComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      const { menuSettingId } = this.props.ui.detailMenuSetting;
      ui.dataTable = new ModelTable();
      ui.dataTable.menuSettingId = menuSettingId;
      //default orderBy
    } catch (e) {
      Logger.error(`ListMenuComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("ListMenuComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`ListMenuComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("ListMenuComponent execute handleRequest");
      const { ui, timeout } = this.state;
    } catch (e) {
      Logger.error(`ListMenuComponent handleRequest ${e.toString()}`);
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
      Logger.error(`ListMenuComponent handleOnRef ${e.toString()}`);
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListMenuComponent execute handleSetData");
      Logger.debug("ListMenuComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data;

      //Logger.debug("ListMenuComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`ListMenuComponent handleSetData ${e.toString()}`);
    }
  }



  handleOnChange(name, value) {
    try {
      Logger.info("ListMenuComponent execute handleOnChange");
      Logger.debug("ListMenuComponent execute handleOnChange receive name", name);
      Logger.debug("ListMenuComponent execute handleOnChange receive value", value);
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
      Logger.error(`ListMenuComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleActive(item) {
    try {
      Logger.info("ListMenuComponent execute handleActive");
      Logger.debug("ListMenuComponent execute handleActive recieve item", item);
      const { ui } = this.state;
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.EDIT_MENU;
      const path = route.replace(":id", item.menuSettingId);
      item.tab = this.props.ui.tab.current
      this.handleRedirectWithState(path, item);
    } catch (e) {
      Logger.error(`ListMenuComponent handleActive ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  render() {
    const { ui, timeout } = this.state;
    return <View ui={ui} timeout={timeout} handleOnRef={this.handleOnRef} handleSetData={this.handleSetData} handleOnChangeSearch={this.handleOnChangeSearch} handleOnChangeSearchValue={this.handleOnChangeSearchValue} handleActive={this.handleActive} />;
  }
}

export default BaseComponent(ListMenuComponent);
