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

class EditTargetPostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleUpdateMenuSettingFailed: this.handleUpdateMenuSettingFailed.bind(this),
        handleUpdateMenuSettingSuccess: this.handleUpdateMenuSettingSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        detailMenuSetting: null,
        isShowBtn: true
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
  handleUpdateMenuSettingSuccess(response) {
    Logger.info(`EditTargetPostComponent execute handleUpdateMenuSettingSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast } = this.props;
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
    timeout.setTimeout(false);
    this.handleConfirm(response);
  }

  handleUpdateMenuSettingFailed() {
    Logger.info(`EditTargetPostComponent execute handleUpdateMenuSettingFailed`);
    const { timeout } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    timeout.setTimeout(false)
    handleClose()

  }

  handleSystemError() {
    try {
      Logger.info("CreateNotifyComponent execute handleSystemError");
      const { timeout } = this.state;
      const { toast, handleClose } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false)
      handleClose()
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditTargetPostComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { allReducer } = this.props;
      ui.detailMenuSetting = allReducer.dialog.data.content
      const { menuSettingId, menuSettingName } = allReducer.dialog.data.content;
      data['menuSettingId'] = menuSettingId
      data['menuSettingName'] = menuSettingName
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

  handleOnChange(name, value) {
    try {
      Logger.info("EditTargetPostComponent execute handleOnChange");
      const { data, ui } = this.state;
      data[name] = value;
      const temp = { ...data }
      const status = Object.values(temp).findIndex(item => item.toString() === '') == -1
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
        this.setState({ ui })
      }
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
      const { updateMenuSetting } = this.props;
      updateMenuSetting(timeout.key, data);
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


  render() {
    const { timeout, ui } = this.state;
    const { handleClose, allReducer } = this.props;

    return <Html timeout={timeout} ui={ui} handleClose={handleClose} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} handleOnRef={this.handleOnRef} />;
  }
}
export default BaseComponent(EditTargetPostComponent);
