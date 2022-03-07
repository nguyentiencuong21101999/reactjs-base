/**
 * Created By Nguyen Cong Thanh on 29/09/2019 18:34.
 *
 * Copyright intelIn 2019.
 */

import React, { Component, Fragment } from 'react'

import Logger from 'service/logger'
import BaseComponent from "base/component";
import RemoveSubChallengeHtml from './html'
import Timeout from "base/component/timeout";
import { ModelRequest, ModelView } from "./model";
import Localize from "service/localize";
class ApproveSubChallengeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(
        this.setState.bind(this),
        this.handleRequest.bind(this),
      ),
      data: new ModelView(),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleApproveSubChallengeFailedByPosition: this.handleApproveSubChallengeFailedByPosition.bind(this),
        handleApproveSubChallengeFailedByNotMission: this.handleApproveSubChallengeFailedByNotMission.bind(this),
        handleApproveSubChallengeSuccess: this.handleApproveSubChallengeSuccess.bind(this),
        handleApproveSubChallengeFailed: this.handleApproveSubChallengeFailed.bind(this)
      },
      ui: {

      },
      ref: {
        reason: React.createRef(),
      },

    };
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleOnRef = this.handleOnRef.bind(this)
    // this.handleOnBack = this.handleOnBack.bind(this)

  }
  handleApproveSubChallengeSuccess() {
    Logger.info(`ApproveSubChallengeComponent execute handleApproveSubChallengeSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
    timeout.setTimeout(false)
    this.handleConfirm()

  }
  handleApproveSubChallengeFailedByPosition() {
    Logger.info(`ApproveSubChallengeComponent execute handleApproveSubChallengeFailedByPosition`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_APPLY_SUB_CHAL_WHEN_NOT_ORDER") })
    timeout.setTimeout(false)
    handleClose()

  }
  handleApproveSubChallengeFailedByNotMission() {
    Logger.info(`ApproveSubChallengeComponent execute handleApproveSubChallengeFailedByNotMission`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_APPLY_SUB_CHAL_WHEN_NO_MISSION") })
    timeout.setTimeout(false)
    handleClose()

  }
  handleApproveSubChallengeFailed() {
    Logger.info(`ApproveSubChallengeComponent execute handleApproveSubChallengeFailed`);
    const { timeout, data, ui } = this.state;
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
      timeout.setTimeout(false)
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      handleClose()
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("ApproveSubChallengeComponent execute UNSAFE_componentWillMount")
      const { ui, data } = this.state
      const { allReducer } = this.props
      const challengeId = allReducer.dialog.data.content.challengeId
      data['challengeId'] = challengeId


    } catch (e) {
      Logger.error(`ApproveSubChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }
  handleSubmit() {
    const { timeout } = this.state;
    timeout.setTimeout()
  }
  handleRequest() {
    try {
      Logger.info(`ApproveSubChallengeComponent execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { approveSubChallenge } = this.props
      approveSubChallenge(timeout.key, data)
    } catch (e) {
      Logger.error(`ApproveSubChallengeComponent execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleConfirm() {
    try {
      Logger.info('ApproveSubChallengeComponent execute handleConfirm')
      const { handleClose, allReducer } = this.props;
      handleClose()
      allReducer.dialog.getHandleConfirm()()
    } catch (e) {
      Logger.error(`ApproveSubChallengeComponent handleConfirm ${e.toString()}`)
    }
  }

  render() {

    const { handleClose, allReducer } = this.props;
    return (
      <RemoveSubChallengeHtml handleClose={handleClose} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} />

    )
  }

}
export default BaseComponent(ApproveSubChallengeComponent)