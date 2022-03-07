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
import Localize from "service/localize"
import RewardEnum from "service/enum/reward";

class EditTargetPostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleUpdateListRequestFailed: this.handleUpdateListRequestFailed.bind(this),
        handleUpdateListRequestSuccess: this.handleUpdateListRequestSuccess.bind(this),
        handleForbidden: this.handleForbidden.bind(this),
      },
      ui: {
        isShowBtn: true,
        listTarget: [
          {
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING,
          },
          {
            text: RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[RewardEnum.PROMOTION_REQUEST_STATUS.DONE],
            value: RewardEnum.PROMOTION_REQUEST_STATUS.DONE,
          },
        ],
        defaultTarget: {},
      },
      ref: {
        reason: React.createRef(),
      },
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
  }
  handleUpdateListRequestFailed() {
    Logger.info(`EditTargetPostComponent execute handleUpdateListRequestFailed`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props;
    toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    timeout.setTimeout(false);
    handleClose();

  }
  handleUpdateListRequestSuccess(response) {
    Logger.info(`EditTargetPostComponent execute handleUpdateListRequestSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast } = this.props;
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
    timeout.setTimeout(false);
    this.handleConfirm(response);
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
      Logger.info("EditTargetPostComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { allReducer } = this.props;
      const { status, requestId } = allReducer.dialog.data.content;
      if (status === RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING) {
        ui.listTarget = [ui.listTarget[1]]
      }

      ui.defaultTarget = ui.listTarget[0]

      data['requestId'] = requestId
      data['status'] = ui.defaultTarget.value
    } catch (e) {
      Logger.error(`EditTargetPostComponent UNSAFE_componentWillMount ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      Logger.info("EditTargetPostComponent execute handleOnRef");
      Logger.debug("EditTargetPostComponent execute handleOnRef receive name", name);
      const { ref, ui } = this.state;
      ref[name] = element;
      if (name === "reason") {
        ref[name].current.focus();
      }
    } catch (e) {
      Logger.error(`EditTargetPostComponent handleOnRef ${e.toString()}`);
    }
  }

  handleConfirm(data) {
    try {
      Logger.info("EditTargetPostComponent execute handleConfirm");
      const { handleClose, allReducer } = this.props;
      handleClose();
      allReducer.dialog.getHandleConfirm()(data);
    } catch (e) {
      Logger.error(`EditTargetPostComponent handleConfirm ${e.toString()}`);
    }
  }

  handleOnChange(event, value) {
    try {
      Logger.info("EditTargetPostComponent execute handleOnChange");
      const { data, ui } = this.state;
      data['status'] = value;
    } catch (e) {
      Logger.error(`EditTargetPostComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleRequest() {
    try {
      Logger.info(`EditTargetPostComponent execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { updateListRequest } = this.props;
      updateListRequest(timeout.key, data);
    } catch (e) {
      Logger.error(`EditTargetPostComponent execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSubmit() {
    const { timeout } = this.state;
    timeout.setTimeout();
  }


  handleForbidden() {
    try {
      Logger.info(`EditTargetPostComponent execute handleForbidden`);
      const { timeout, ui, data } = this.state;
      timeout.setTimeout(false, "all", "LYT_FORBIDDEN_ERROR");
    } catch (e) {
      Logger.error(`EditTargetPostComponent execute handleForbidden ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  render() {
    const { timeout, ui } = this.state;
    const { handleClose, allReducer } = this.props;

    return <Html timeout={timeout} ui={ui} handleClose={handleClose} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} handleOnRef={this.handleOnRef} />;
  }
}
export default BaseComponent(EditTargetPostComponent);
