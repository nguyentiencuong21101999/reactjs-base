import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";

import DialogEnum from "service/enum/dialog";
import DialogModel from "component/layout/dialog/model";
import RouteEnum from "service/enum/route";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import Localize from "service/localize";

class InfoFoodComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailFoodSuccess: this.handleGetDetailFoodSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        postId: {},
        detailFood: null,
        tab: {
          current: 1,
          detail: 1,
          requestList: 2,
        },
      },
      req: {},
    };
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  handleGetDetailFoodSuccess(response) {
    try {
      Logger.info("InfoFoodComponent execute handleGetDetailChallengeSuccess");
      const { ui } = this.state;
      this.state.timeout.setTimeout(false);
      ui.detailFood = response;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoFoodComponent handleGetDetailChallengeSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("InfoFoodComponent execute handleSystemError");
      const { ui, timeout } = this.state;
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`InfoFoodComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("InfoFoodComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      const detailFood = { ...location.state };
      data["foodId"] = detailFood.foodId;
    } catch (e) {
      Logger.error(`InfoFoodComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("InfoFoodComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`InfoFoodComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("InfoFoodComponent execute handleRequest");
      const { ui, timeout, data } = this.state;
      const { getDetailFood } = this.props;
      getDetailFood(timeout.key, data["foodId"]);
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }


  handleOnBack() {
    try {
      Logger.info("InfoChalleInfoFoodComponentngeComponent execute handleOnBack");
      let path = RouteEnum.PAGE.MANAGE_MENU.FOOD._;
      this.handleRedirectWithState(path);
    } catch (e) {
      Logger.error(`InfoFoodComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleEdit() {
    try {
      Logger.info("InfoFoodComponent execute handleEdit");
      const { ui, timeout } = this.state;
      const route = RouteEnum.PAGE.MANAGE_MENU.FOOD.EDIT;
      const path = route.replace(":id", ui.detailFood.foodId);
      this.handleRedirectWithState(path, ui.detailFood);
    } catch (e) {
      Logger.error(`InfoFoodComponent handleEdit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleChangeTab(event, value) {
    try {
      Logger.info("InfoFoodComponent execute handleChangeTab");
      Logger.debug("InfoFoodComponent execute handleChangeTab recieve value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      switch (value) {
        case `${ui.tab.detail}`:
          ui.tab.current = ui.tab.detail;
          break;
        case `${ui.tab.requestList}`:
          ui.tab.current = ui.tab.requestList;
          break;
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoFoodComponent handleChangeTab ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }


  render() {
    const { ui, timeout, data, req } = this.state;
    return ui.detailFood ? <View ui={ui} data={data} timeout={timeout}
      handleOnBack={this.handleOnBack} handleEdit={this.handleEdit}
      handleChangeTab={this.handleChangeTab}
    /> : null;
  }
}

export default BaseComponent(InfoFoodComponent);
