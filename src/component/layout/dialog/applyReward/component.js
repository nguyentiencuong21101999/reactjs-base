/**
 * Created By Nguyen Cong Thanh on 29/09/2019 18:34.
 *
 * Copyright intelIn 2019.
 */

import React, { Component, Fragment } from "react";
import BaseComponent from "base/component";
import Logger from "service/logger";

import Html from "./html";
import Timeout from "base/component/timeout";
import { ModelRequest, ModelView } from "./model";
import RewardEnum from "service/enum/reward";
import Localize from "service/localize";
class ApplyRewardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleApplyRewardSuccess: this.handleApplyRewardSuccess.bind(this),
        handleUpdateStatusRewardFailed: this.handleUpdateStatusRewardFailed.bind(this),
      },
      ui: {},
      ref: {
        reason: React.createRef(),
      },
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
  }
  handleApplyRewardSuccess() {
    Logger.info(`ApplyRewardComponent execute handleUpdateChallengeResultSuccess`);
    const { timeout, data, ui } = this.state;
    const { handleClose, toast } = this.props;
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
    timeout.setTimeout(false);
    this.handleConfirm();

  }
  handleUpdateStatusRewardFailed(response) {
    try {
      Logger.info("ApplyRewardComponent execute handleUpdateStatusRewardFailed");
      const { timeout, ui } = this.state;
      const { toast, handleClose } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
      handleClose();

    } catch (e) {
      Logger.error(`ApplyRewardComponent handleUpdateStatusRewardFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info('InfoPostComponent execute handleSubmit')
      const { ui, timeout } = this.state
      const { toast, handleClose } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
      handleClose();

    } catch (e) {
      Logger.error(`InfoPostComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("ApplyRewardComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { allReducer } = this.props;
      const { proId } = allReducer.dialog.data.content;
      data['proId'] = proId
      data['status'] = RewardEnum.PROMOTION_STATUS.APPLIED
    } catch (e) {
      Logger.error(`ApplyRewardComponent UNSAFE_componentWillMount ${e.toString()}`);
    }
  }
  handleOnRef(name, element) {
    try {
      Logger.info("ApplyRewardComponent execute handleOnRef");
      Logger.debug("ApplyRewardComponent execute handleOnRef receive name", name);
      const { ref, ui } = this.state;
      ref[name] = element;
      if (name === "reason") {
        ref[name].current.focus();
      }
    } catch (e) {
      Logger.error(`ApplyRewardComponent handleOnRef ${e.toString()}`);
    }
  }

  handleConfirm() {
    try {
      Logger.info("ApplyRewardComponent execute handleConfirm");
      const { timeout, ui, data } = this.state;
      const { handleClose, allReducer } = this.props;
      handleClose();
      allReducer.dialog.getHandleConfirm()();
    } catch (e) {
      Logger.error(`ApplyRewardComponent handleConfirm ${e.toString()}`);
    }
  }
  handleOnBack() {
    try {
      Logger.info("ApplyRewardComponent execute handleOnBack");
      const { handleClose, allReducer } = this.props;
      allReducer.dialog.getHandleClose()();
      handleClose();
    } catch (e) {
      Logger.error(`ApplyRewardComponent handleOnBack ${e.toString()}`);
    }
  }
  handleRequest() {
    try {
      Logger.info(`ApplyRewardComponent execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { applyReward } = this.props;

      applyReward(timeout.key, data);
    } catch (e) {
      Logger.error(`ApplyRewardComponent execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSubmit() {
    const { timeout } = this.state;
    timeout.setTimeout();
  }


  render() {
    const { timeout, ui } = this.state;
    const { handleClose, allReducer } = this.props;

    return <Html timeout={timeout} ui={ui} handleClose={this.handleOnBack} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnRef={this.handleOnRef} />;
  }
}
export default BaseComponent(ApplyRewardComponent);
