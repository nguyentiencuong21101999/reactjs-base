import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";

import DialogEnum from "service/enum/dialog";
import DialogModel from "component/layout/dialog/model";
import RouteEnum from "service/enum/route";
import RewardEnum from "service/enum/reward";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import Localize from "service/localize";
import Helper from 'service/helper'

class InfoRewardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailRewardSuccess: this.handleGetDetailRewardSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        postId: {},
        detailReward: null,
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
    this.handleApplyReward = this.handleApplyReward.bind(this);
    this.handleEndReward = this.handleEndReward.bind(this);
  }
  handleGetDetailRewardSuccess(response) {
    try {
      Logger.info("InfoRewardComponent execute handleGetDetailChallengeSuccess");
      const { ui } = this.state;
      this.state.timeout.setTimeout(false);
      ui.detailReward = response;
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
      const { state } = this.props.location
      const detailReward = { ...location.state };
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)
      data["proId"] = detailReward.proId;
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
      const { getDetailReward } = this.props;
      getDetailReward(timeout.key, data["proId"]);
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }



  handleOnBack() {
    try {
      Logger.info("InfoChalleInfoRewardComponentngeComponent execute handleOnBack");
      let path = RouteEnum.PAGE.MANAGE_LOYALTY._;
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
      const route = RouteEnum.PAGE.MANAGE_LOYALTY.REWARD.EDIT;
      const path = route.replace(":id", ui.detailReward.promotionResp.proId);
      this.handleRedirectWithState(path, ui.detailReward);
    } catch (e) {
      Logger.error(`InfoRewardComponent handleEdit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleChangeTab(event, value) {
    try {
      Logger.info("InfoRewardComponent execute handleChangeTab");
      Logger.debug("InfoRewardComponent execute handleChangeTab recieve value", value);
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
      Logger.error(`InfoRewardComponent handleChangeTab ${e.toString()}`);
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleApplyReward() {
    try {
      Logger.info("InfoRewardComponent execute handleApplyReward");
      const { ui } = this.state;
      const { updateModal } = this.props;
      const dialog = new DialogModel();
      dialog.setView(DialogEnum.VIEW.APPLY_REWARD);
      dialog.setTitle(Localize.getLocalize("LC_APPLY_REWARD"));
      dialog.setContent({ proId: ui.detailReward.promotionResp.proId });
      dialog.setHandleConfirm(() => {
        ui.detailReward.promotionResp.status = RewardEnum.PROMOTION_STATUS.APPLIED
        this.setState({ ui })
      });
      updateModal(dialog);
    } catch (e) {
      Logger.error(`InfoRewardComponent handleApplyReward ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleEndReward() {
    try {
      Logger.info("InfoRewardComponent execute handleEndReward");
      const { ui } = this.state;
      const { updateModal } = this.props;
      const dialog = new DialogModel();
      dialog.setView(DialogEnum.VIEW.END_REWARD);
      dialog.setTitle(Localize.getLocalize(("LC_PAUSE_REWARD")));
      dialog.setContent({ proId: ui.detailReward.promotionResp.proId });
      dialog.setHandleConfirm(() => {
        ui.detailReward.promotionResp.status = RewardEnum.PROMOTION_STATUS.POSTPONE
        this.setState({ ui })
      });
      updateModal(dialog);
    } catch (e) {
      Logger.error(`InfoRewardComponent handleEndReward ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return ui.detailReward ? <View ui={ui} data={data} timeout={timeout} handleOnBack={this.handleOnBack} handleEdit={this.handleEdit} handleChangeTab={this.handleChangeTab} handleApplyReward={this.handleApplyReward} handleEndReward={this.handleEndReward} /> : null;
  }
}

export default BaseComponent(InfoRewardComponent);
