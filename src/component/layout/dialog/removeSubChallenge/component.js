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
class RemoveSubChallengeComponent extends Component {

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
        handleRemoveOrApplyFailed: this.handleRemoveOrApplyFailed.bind(this),
        handleRemoveSubChallengeFailedByHaveMission: this.handleRemoveSubChallengeFailedByHaveMission.bind(this),
        handleRemoveSubChallengeSuccess: this.handleRemoveSubChallengeSuccess.bind(this),
        handleRemoveSubChallengeFailed: this.handleRemoveSubChallengeFailed.bind(this)
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
  handleRemoveSubChallengeSuccess() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveSubChallengeSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_DELETE_SUCCESS") })
    timeout.setTimeout(false)
    this.handleConfirm()
  }
  handleRemoveOrApplyFailed() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveOrApplyFailed`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ACTION_DENY_WHEN_SUB_CHAL_APPLIED") })
    timeout.setTimeout(false)
    handleClose()

  }
  handleRemoveSubChallengeFailedByHaveMission() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveSubChallengeFailedByHaveMission`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_TOAST_DELETE_SUB_CHAL_WHEN_HAVE_MISSON") })
    timeout.setTimeout(false)
    handleClose()

  }
  handleRemoveSubChallengeFailed() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveSubChallengeFailed`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    timeout.setTimeout(false)
    handleClose()

  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("RemoveSubChallengeComponent execute UNSAFE_componentWillMount")
      const { ui, data } = this.state
      const { allReducer } = this.props
      const challengeId = allReducer.dialog.data.content.challengeId
      data['challengeId'] = challengeId


    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }
  handleSubmit() {
    const { timeout } = this.state;
    timeout.setTimeout()
  }
  handleRequest() {
    try {
      Logger.info(`RemoveSubChallengeComponent execute handleRequest`);
      const { timeout, ui, data } = this.state;
      const { removeSubChallenge } = this.props
      removeSubChallenge(timeout.key, data)
    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleConfirm() {
    try {
      Logger.info('RemoveSubChallengeComponent execute handleConfirm')
      const { handleClose, allReducer } = this.props;
      handleClose()
      allReducer.dialog.getHandleConfirm()()
    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent handleConfirm ${e.toString()}`)
    }
  }

  render() {

    const { handleClose, allReducer } = this.props;
    return (
      <RemoveSubChallengeHtml handleClose={handleClose} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} />

    )
  }

}
export default BaseComponent(RemoveSubChallengeComponent)