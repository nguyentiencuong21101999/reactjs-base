import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";

import RouteEnum from "service/enum/route";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import Localize from "service/localize";
class InfoMemberComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailMemberSuccess: this.handleGetDetailMemberSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        postId: {},
        detailMember: null,
        tab: {
          current: 1,
          detail: 1,
          requestList: 2,
        },
      },
      req: {},
    };
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  handleGetDetailMemberSuccess(response) {
    try {
      Logger.info("InfoMemberComponent execute handleGetDetailMemberSuccess");
      const { ui } = this.state;
      this.state.timeout.setTimeout(false);
      ui.detailMember = response;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoMemberComponent handleGetDetailMemberSuccess ${e.toString()}`);
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
      Logger.info("InfoMemberComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      const detailMember = { ...location.state };
      data["userId"] = detailMember.userId;
    } catch (e) {
      Logger.error(`InfoMemberComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("InfoMemberComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`InfoMemberComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("InfoMemberComponent execute handleRequest");
      const { ui, timeout, data } = this.state;
      const { getDetailMember } = this.props;
      getDetailMember(timeout.key, data["userId"]);
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnBack() {
    try {
      Logger.info("InfoChalleInfoMemberComponentngeComponent execute handleOnBack");
      let path = RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER._;
      this.handleRedirectWithState(path);
    } catch (e) {
      Logger.error(`InfoMemberComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info("InfoMemberComponent execute handleChangeTab");
      Logger.debug("InfoMemberComponent execute handleChangeTab recieve value", value);
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
      Logger.error(`InfoMemberComponent handleChangeTab ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return ui.detailMember ? <View ui={ui} data={data} timeout={timeout} handleOnBack={this.handleOnBack} handleChangeTab={this.handleChangeTab} handleApplyReward={this.handleApplyReward} handleEndReward={this.handleEndReward} /> : null;
  }
}

export default BaseComponent(InfoMemberComponent);
