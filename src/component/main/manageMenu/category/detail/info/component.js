import React, { Component } from "react";
import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import RouteEnum from "service/enum/route";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import Localize from "service/localize";
class InfoMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailCategorySuccess: this.handleGetDetailCategorySuccess.bind(this),
        handleGetDetailCategoryFailed: this.handleGetDetailCategoryFailed.bind(this),
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
      Logger.info("InfoMenuComponent execute handleGetDetailCategorySuccess");
      const { ui } = this.state;
      this.state.timeout.setTimeout(false);
      ui.detailCategory = response;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoMenuComponent handleGetDetailCategorySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleGetDetailCategoryFailed(response) {
    try {
      Logger.info("InfoMenuComponent execute handleGetDetailCategoryFailed");
      const { ui } = this.state;
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      this.state.timeout.setTimeout(false);
      // const route = RouteEnum.PAGE.MANAGE_MENU.CATEGORY._;
      // this.handleRedirectWithState(route);
    } catch (e) {
      Logger.error(`InfoMenuComponent handleGetDetailCategoryFailed ${e.toString()}`);
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
      Logger.info("InfoMenuComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      const detailCategory = { ...location.state };
      data["menuCategoryId"] = detailCategory.menuCategoryId;
    } catch (e) {
      Logger.error(`InfoMenuComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("InfoMenuComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`InfoMenuComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("InfoMenuComponent execute handleRequest");
      const { ui, timeout, data } = this.state;
      const { getDetailCategory } = this.props;
      getDetailCategory(timeout.key, data["menuCategoryId"]);
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }



  handleOnBack() {
    try {
      Logger.info("InfoChalleInfoMenuComponentngeComponent execute handleOnBack");
      let path = RouteEnum.PAGE.MANAGE_MENU._;
      this.handleRedirectWithState(path);
    } catch (e) {
      Logger.error(`InfoMenuComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleEdit() {
    try {
      Logger.info("InfoMenuComponent execute handleEdit");
      const { ui, timeout } = this.state;
      const route = RouteEnum.PAGE.MANAGE_MENU.CATEGORY.EDIT;
      const path = route.replace(":id", ui.detailCategory.menuCategoryId);
      this.handleRedirectWithState(path, ui.detailCategory);
    } catch (e) {
      Logger.error(`InfoMenuComponent handleEdit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return ui.detailCategory ? <View ui={ui} data={data} timeout={timeout} handleOnBack={this.handleOnBack} handleEdit={this.handleEdit} /> : null;
  }
}

export default BaseComponent(InfoMenuComponent);
