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
        handleRemoveMissionFailedByNotSubOrDraft: this.handleRemoveMissionFailedByNotSubOrDraft.bind(this),
        handleRemoveMissionSuccess: this.handleRemoveMissionSuccess.bind(this),
        handleRemoveMissionFailed: this.handleRemoveMissionFailed.bind(this)
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
    this.handleOnBack = this.handleOnBack.bind(this)

  }
  handleRemoveMissionSuccess() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveMissionSuccess`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "success", message: Localize.getLocalize("LC_TOAST_DELETE_SUCCESS") })
    timeout.setTimeout(false)
    this.handleConfirm(data['missionId'])
  }
  handleRemoveMissionFailedByNotSubOrDraft() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveMissionFailedByNotSubOrDraft`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ACTION_DENY_WHEN_SUB_CHAL_APPLIED") })
    timeout.setTimeout(false)
    this.handleConfirm()

  }
  handleRemoveMissionFailed() {
    Logger.info(`RemoveSubChallengeComponent execute handleRemoveMissionFailed`);
    const { timeout, data, ui } = this.state;
    const { toast, handleClose } = this.props
    toast({ status: "error", message:Localize.getLocalize("LC_SYSTEM_BUSY")})
    timeout.setTimeout(false)
    this.handleConfirm()

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
      Logger.info("RemoveSubChallengeComponent execute UNSAFE_componentWillMount")
      const { ui, data } = this.state
      const { allReducer } = this.props
      const missionId = allReducer.dialog.data.content.missionId
      data['missionId'] = missionId


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
      const { removeMission } = this.props
      removeMission(timeout.key, data['missionId'])
    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent execute handleRequest ${e.toString()}`);
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleConfirm(missionId) {
    try {
      Logger.info('RemoveSubChallengeComponent execute handleConfirm')
      const { handleClose, allReducer } = this.props;
      handleClose()
      allReducer.dialog.getHandleConfirm()(missionId)
    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent handleConfirm ${e.toString()}`)
    }
  }
  handleOnBack() {
    try {
      Logger.info('RemoveSubChallengeComponent execute handleOnBack')
      const { handleClose, allReducer } = this.props;
      this.handleConfirm()
    } catch (e) {
      Logger.error(`RemoveSubChallengeComponent handleConfirm ${e.toString()}`)
    }
  }

  render() {

    const { handleClose, allReducer } = this.props;
    return (
      <RemoveSubChallengeHtml handleClose={this.handleOnBack} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} />

    )
  }

}
export default BaseComponent(RemoveSubChallengeComponent)