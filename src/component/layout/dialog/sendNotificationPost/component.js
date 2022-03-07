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
import PostEnum from "service/enum/post";
import Localize from "service/localize";

class SendNotificationPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleSendNotificationPostSuccess: this.handleSendNotificationPostSuccess.bind(this),
        handleSendNotificationPostFailed: this.handleSendNotificationPostFailed.bind(this),
      },
      ui: {
        listTarget: [
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PLANNING_A_PREGNANCY],
            value: PostEnum.TARGET.PLANNING_A_PREGNANCY,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PREGNANCY_TRACKING],
            value: PostEnum.TARGET.PREGNANCY_TRACKING,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.HAD_A_BABY],
            value: PostEnum.TARGET.HAD_A_BABY,
          },
        ],
        defaultTarget: [],
        isShowBtn: true
      },
      ref: {
        reason: React.createRef(),
      },
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this)
  }
  handleSendNotificationPostSuccess() {
    Logger.info(`handleSendNotification execute handleSendNotificationPostSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, messageCenterUpdate } = this.props;
    timeout.setTimeout(false);
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_SEND_NOTI_SUCCESS") });
    this.handleConfirm();
  }
  handleSendNotificationPostFailed() {
    Logger.info(`handleSendNotification execute handleSendNotificationPostFailed`);
    const { ui, timeout } = this.state
    const { toast, handleClose } = this.props
    timeout.setTimeout(false);
    handleClose();
    toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
  }
  handleSystemError() {
    try {
      Logger.info('InfoPostComponent execute handleSubmit')
      const { ui, timeout } = this.state
      const { toast, handleClose } = this.props
      timeout.setTimeout(false);
      handleClose();
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`InfoPostComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("handleSendNotification execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { allReducer } = this.props;
      const detailPost = allReducer.dialog.data.content;
      ui.defaultTarget = [ui.listTarget[0]];
      data["postId"] = detailPost.postId;
      data["target"] = [ui.listTarget[0].value];
    } catch (e) {
      Logger.error(`handleSendNotification UNSAFE_componentWillMount ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      Logger.info("handleSendNotification execute handleOnRef");
      Logger.debug("handleSendNotification execute handleOnRef receive name", name);
      const { ref, ui } = this.state;
      ref[name] = element;
      if (name === "reason") {
        ref[name].current.focus();
      }
    } catch (e) {
      Logger.error(`handleSendNotification handleOnRef ${e.toString()}`);
    }
  }
  handleOnChangeTarget(event, list) {
    try {
      Logger.info("EditTargetPostComponent execute handleOnChangeTarget");
      Logger.debug("EditTargetPostComponent execute handleOnChangeTarget receive list", list);
      const { data, ui } = this.state;
      data["target"] = list;
      this.handleOnChange('target', list)
    } catch (e) {
      Logger.error(`EditTargetPostComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info('ProfileComponent execute handleOnChange')
      Logger.debug('ProfileComponent execute handleOnChange receive name', name)
      Logger.debug('ProfileComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      const temp = { ...data }
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`ProfileComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleConfirm() {
    try {
      Logger.info("handleSendNotification execute handleConfirm");
      const { timeout, ui, data } = this.state;
      const { handleClose, allReducer } = this.props;
      handleClose();
      allReducer.dialog.getHandleConfirm()();
    } catch (e) {
      Logger.error(`handleSendNotification handleConfirm ${e.toString()}`);
    }
  }
  handleOnBack() {
    try {
      Logger.info("handleSendNotification execute handleOnBack");
      const { handleClose, allReducer } = this.props;
      allReducer.dialog.getHandleClose()();
      handleClose();
    } catch (e) {
      Logger.error(`handleSendNotification handleOnBack ${e.toString()}`);
    }
  }
  handleRequest() {
    try {
      Logger.info(`handleSendNotification execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { sendNotificationPost } = this.props;
      sendNotificationPost(timeout.key, data)
    } catch (e) {
      Logger.error(`handleSendNotification execute handleRequest ${e.toString()}`);
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
    const { allReducer } = this.props;

    return <Html timeout={timeout} ui={ui}
      handleClose={this.handleOnBack}
      dialog={allReducer.dialog}
      handleSubmit={this.handleSubmit}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnChangeTarget={this.handleOnChangeTarget}

    />;
  }
}
export default BaseComponent(SendNotificationPost);
