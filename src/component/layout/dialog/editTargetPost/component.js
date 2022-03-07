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
import MessageCenterModel from "reduxStore/reducer/messageCenter/model";
import ResponseCode from "service/responseCode";
import Localize from "service/localize";
import PostEnum from "service/enum/post";

class EditTargetPostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleUpdateTargetPostSuccees: this.handleUpdateTargetPostSuccees.bind(this),
        handleForbidden: this.handleForbidden.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        isShowBtn: true,
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
  handleUpdateTargetPostSuccees() {
    Logger.info(`EditTargetPostComponent execute handleUpdateTargetPostSuccees`);
    const { timeout, data, ui } = this.state;
    const { toast, messageCenterUpdate } = this.props;
    timeout.setTimeout(false);
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
    let resposne = (ui.defaultTarget = data["target"].map((item) => {
      return ui.listTarget.find((target) => target.value == item);
    }));

    resposne = resposne.map(({ text, value }) => ({ name: text, targetMeijiId: value }));
    // toast({status:'success', message:`${Localize.getLocalize('LYT_REJECTED_STAMP_POPUP')}`})
    const messageCenterModel = new MessageCenterModel();
    messageCenterModel.setCode(ResponseCode.FRONT_END.EDIT_TARGET_POST_SUCCESS);
    messageCenterModel.setData(resposne);
    messageCenterUpdate(messageCenterModel.getInfo());

    this.handleConfirm();
  }

  handleForbidden() {
    try {
      Logger.info(`EditTargetPostComponent execute handleForbidden`);
      const { ui, timeout } = this.state;
      const { toast, handleClose } = this.props;
      timeout.setTimeout(false);
      handleClose();
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditTargetPostComponent execute handleForbidden ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateNotifyComponent execute handleSystemError");
      const { timeout } = this.state;
      const { toast, handleClose } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      handleClose();
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
      const target = allReducer.dialog.data.content.target;
      const postId = allReducer.dialog.data.content.postId;
      ui.defaultTarget =
        target.length > 0
          ? target.map((item) => {
              return ui.listTarget.find((target) => target.value == item.targetMeijiId);
            })
          : [ui.listTarget[0]];
      data["target"] = [ui.listTarget[0].value];
      data["postId"] = postId;
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

  handleConfirm() {
    try {
      Logger.info("EditTargetPostComponent execute handleConfirm");
      const { handleClose, allReducer } = this.props;
      handleClose();
      allReducer.dialog.getHandleConfirm()();
    } catch (e) {
      Logger.error(`EditTargetPostComponent handleConfirm ${e.toString()}`);
    }
  }

  handleOnChange(event, list) {
    try {
      Logger.info("EditTargetPostComponent execute handleOnChange");
      Logger.debug("EditTargetPostComponent execute handleOnChange receive list", list);
      const { data, ui } = this.state;
      data["target"] = list;
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
      const { updateTarget } = this.props;
      const payload = new ModelRequest().setTarget(data["target"]).setPostId(data["postId"]);
      updateTarget(timeout.key, payload);
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
