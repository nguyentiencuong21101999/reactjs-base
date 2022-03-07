import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import RouteEnum from "service/enum/route";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import Localize from "service/localize";
class InfoRewardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailCategorySuccess: this.handleGetDetailCategorySuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        postId: {},
        detailCategory: null,
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
  }
  handleGetDetailCategorySuccess(response) {
    try {
      Logger.info("InfoRewardComponent execute handleGetDetailChallengeSuccess");
      const { ui } = this.state;
      this.state.timeout.setTimeout(false);
      ui.detailCategory = response;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoRewardComponent handleGetDetailChallengeSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
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
      Logger.info("InfoRewardComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      const detailCategory = { ...location.state };
      data["categoryId"] = detailCategory.categoryId;
    } catch (e) {
      Logger.error(`InfoRewardComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("InfoRewardComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`InfoRewardComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("InfoRewardComponent execute handleRequest");
      const { ui, timeout, data } = this.state;
      const { getDetailCategory } = this.props;
      getDetailCategory(timeout.key, data["categoryId"]);
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }


  handleOnBack() {
    try {
      Logger.info("InfoChalleInfoRewardComponentngeComponent execute handleOnBack");
      let path = RouteEnum.PAGE.MANAGE_POST.CATEGORY._;
      this.handleRedirectWithState(path);
    } catch (e) {
      Logger.error(`InfoRewardComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleEdit() {
    try {
      Logger.info("InfoRewardComponent execute handleEdit");
      const { ui, timeout } = this.state;
      const route = RouteEnum.PAGE.MANAGE_POST.CATEGORY.EDIT;
      const path = route.replace(":id", ui.detailCategory.categoryId);
      this.handleRedirectWithState(path, ui.detailCategory);
    } catch (e) {
      Logger.error(`InfoRewardComponent handleEdit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }


  render() {
    const { ui, timeout, data } = this.state;
    return ui.detailCategory ? <View ui={ui} data={data} timeout={timeout} handleOnBack={this.handleOnBack} handleEdit={this.handleEdit} /> : null;
  }
}

export default BaseComponent(InfoRewardComponent);
