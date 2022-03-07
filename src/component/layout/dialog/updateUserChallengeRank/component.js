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
import ChallengeEnum from "service/enum/challenge";
import Helper from "service/helper";
import Localize from "service/localize";
class UpdateChallengePostResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      data: new ModelView(),
      func: {
        handleUpdateUserChallengeRankSuccess: this.handleUpdateUserChallengeRankSuccess.bind(this),
        handleUpdateUserChallengeRankFailed: this.handleUpdateUserChallengeRankFailed.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        listRank: [
          {
            text: ChallengeEnum.USER_CHALLENGE_RANK_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_RANK_STATUS.SUCCESS],
            value: ChallengeEnum.USER_CHALLENGE_RANK_STATUS.SUCCESS,
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_RANK_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_RANK_STATUS.FAILED],
            value: ChallengeEnum.USER_CHALLENGE_RANK_STATUS.FAILED,
          },
        ],
        defaultRank: {},

        listPost: [],
        defaultPost: null,
        listPost: [],
        defaultPost: {},
        detailParticipant: null,
        isShowBtn: true,
      },
      ref: {
        reason: React.createRef(),
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeRank = this.handleOnChangeRank.bind(this);
    this.handleOnChangResult = this.handleOnChangResult.bind(this);
    this.handleOnChangePost = this.handleOnChangePost.bind(this);
  }
  handleUpdateUserChallengeRankSuccess(response) {
    Logger.info(`UpdateChallengePostResult execute handleUpdateUserChallengeRankSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props;
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
    timeout.setTimeout(false);
    this.handleConfirm(response);
  }
  handleUpdateUserChallengeRankFailed() {
    Logger.info(`UpdateChallengePostResult execute handleUpdateUserChallengeRankSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, messageCenterUpdate } = this.props;
    toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    timeout.setTimeout(false);
    this.handleConfirm();
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
      Logger.info("UpdateChallengePostResult execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { allReducer } = this.props;

      ui.detailParticipant = allReducer.dialog.data.content;

      ui.defaultRank = ui.detailParticipant.result === ChallengeEnum.USER_CHALLENGE_POST_STATUS.JOINED ? ui.listRank[0] :   !Helper.isEmpty(ui.detailParticipant.rank) ? ui.listRank[0] : ui.listRank[1];

      if (ui.detailParticipant.posts.length > 0) {
        ui.detailParticipant.posts.map((item) => {
            ui.listPost.push({ text: item.postId, value: item.postId });
        });
      }
      ui.defaultPost = ui.listPost.length > 0 ? (!Helper.isEmpty(ui.detailParticipant.postId) ? ui.listPost.find((item) => item.value == ui.detailParticipant.postId) : ui.listPost[0]) : null;
      data["challengeId"] = ui.detailParticipant.challengeId;
      data["userId"] = ui.detailParticipant.userId;
      data["rank"] = !Helper.isEmpty(ui.detailParticipant.rank) ? ui.detailParticipant.rank : "";
      data["postId"] = !Helper.isEmpty(ui.detailParticipant.postId) ? ui.detailParticipant.postId : !Helper.isEmpty(ui.defaultPost) ? ui.defaultPost.value : "" ;
    } catch (e) {
      Logger.error(`UpdateChallengePostResult UNSAFE_componentWillMount ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnChange");
      Logger.debug("CreateChallengeComponent execute handleOnChange receive name", name);
      Logger.debug("CreateChallengeComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateChallengeComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp["radio"];
      if (ui.defaultRank.value === ChallengeEnum.USER_CHALLENGE_RANK_STATUS.FAILED) {
        delete temp["rank"];
        delete temp["postId"];
      }
      const status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`ProfileComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangResult(event, value) {
    try {
      Logger.info("ProfileComponent execute handleOnChangResult");
      Logger.debug("ProfileComponent execute handleOnChangResult receive value", value);
      const { data, ui } = this.state;
      ui.defaultRank = ui.listRank.find((item) => item.value == value);
      switch (ui.defaultRank.value) {
        case ChallengeEnum.USER_CHALLENGE_RANK_STATUS.SUCCESS:
          data["rank"] = "";
          data["postId"] = !Helper.isEmpty(ui.defaultPost) &&  !Helper.isEmpty(ui.defaultPost.value) ? ui.defaultPost.value : "";
          break;
        case ChallengeEnum.USER_CHALLENGE_RANK_STATUS.FAILED:
          break;
      }
      this.setState({ ui });
      this.handleOnChange("radio", value);
    } catch (e) {
      Logger.error(`ProfileComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeRank(event, value) {
    try {
      Logger.info("ProfileComponent execute handleOnChange");
      Logger.debug("ProfileComponent execute handleOnChange receive name", name);
      Logger.debug("ProfileComponent execute handleOnChange receive value", value);
      const { ui } = this.state;
      if (!Helper.isEmpty(value)) {
        ui.defaultReward = ui.listReward.find((item) => item.value == value);
      }
      this.setState({ ui });
      this.handleOnChange("rank", value);
    } catch (e) {
      Logger.error(`ProfileComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangePost(event, value) {
    try {
      Logger.info("ProfileComponent execute handleOnChangePost");
      Logger.debug("ProfileComponent execute handleOnChangePost receive value", value);
      const { data, ui } = this.state;
      ui.defaultPost = ui.listPost.find((item) => item.value == value);
      this.setState({ ui });
      this.handleOnChange("postId", value);
    } catch (e) {
      Logger.error(`ProfileComponent handleOnChangePost ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnRef(name, element) {
    try {
      Logger.info("UpdateChallengePostResult execute handleOnRef");
      Logger.debug("UpdateChallengePostResult execute handleOnRef receive name", name);
      const { ref, ui } = this.state;
      ref[name] = element;
      if (name === "reason") {
        ref[name].current.focus();
      }
    } catch (e) {
      Logger.error(`UpdateChallengePostResult handleOnRef ${e.toString()}`);
    }
  }

  handleConfirm(response) {
    try {
      Logger.info("UpdateChallengePostResult execute handleConfirm");
      const { timeout, ui, data } = this.state;
      const { handleClose, allReducer } = this.props;
      handleClose();
      allReducer.dialog.getHandleConfirm()(response);
    } catch (e) {
      Logger.error(`UpdateChallengePostResult handleConfirm ${e.toString()}`);
    }
  }
  handleOnBack() {
    try {
      Logger.info("UpdateChallengePostResult execute handleOnBack");
      const { handleClose, allReducer } = this.props;
      allReducer.dialog.getHandleClose()();
      handleClose();
    } catch (e) {
      Logger.error(`UpdateChallengePostResult handleOnBack ${e.toString()}`);
    }
  }
  handleRequest() {
    try {
      Logger.info(`UpdateChallengePostResult execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { updateUserChallengeRank } = this.props;
      switch (ui.defaultRank.value) {
        case ChallengeEnum.USER_CHALLENGE_RANK_STATUS.SUCCESS:
          const payloadSuccess = new ModelRequest().setChallengeId(data["challengeId"]).setUserId(data["userId"]).setPostId(data["postId"]).setRank(data["rank"]);
          updateUserChallengeRank(timeout.key, payloadSuccess);
          break;
        case ChallengeEnum.USER_CHALLENGE_RANK_STATUS.FAILED:
          const payloadFailed = new ModelRequest().setChallengeId(data["challengeId"]).setUserId(data["userId"]).setPostId(undefined).setRank(undefined);
          updateUserChallengeRank(timeout.key, payloadFailed);
          break;
      }

      // updateUserChallengeResult(timeout.key, data)
    } catch (e) {
      Logger.error(`UpdateChallengePostResult execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSubmit() {
    const { timeout } = this.state;
    timeout.setTimeout();
  }

  render() {
    const { timeout, ui,data } = this.state;
    const { allReducer } = this.props;

    return <Html timeout={timeout} data={data} ui={ui} handleClose={this.handleOnBack} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} handleOnRef={this.handleOnRef} handleOnChangeRank={this.handleOnChangeRank} handleOnChangResult={this.handleOnChangResult} handleOnChangePost={this.handleOnChangePost} />;
  }
}
export default BaseComponent(UpdateChallengePostResult);
