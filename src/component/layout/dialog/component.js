/**
 * Created By Nguyen Cong Thanh on 29/09/2019 18:34.
 *
 * Copyright intelIn 2019.
 */

import React, { Component, Fragment } from 'react'

import Logger from 'service/logger'
import DialogEnum from 'service/enum/dialog'

import DialogHtml from './html'
import ConfirmComponent from './confirm'
import ExpiredTokenComponent from "./expiredToken"
import Model from './model'
import NotifyComponent from './notification'
import RemovePostComponent from './removePost'
import EditTargetPostComponent from './editTargetPost'
import UpdateChallengePostResult from './updateChallengePostResult'
import UpdateChallengeResult from './updateChallengeResult'
import RemoveSubChallenge from './removeSubChallenge'
import ApproveSubChallenge from './approveSubChallenge'
import RemoveMission from './removeMission'
import UpdateUserChallengeMission from './updateUserChallengeMissionResult'
import ApplyChallenge from './applyChallenge'
import EndChallenge from './endChallenge'
import SendNotificationChallenge from './sendNotificationChallenge'
import SendNotificationPost from './sendNotificationPost'
import CreateNotification from './createNotification'
import ApplyRewardComponent from './applyReward'
import EndRewardComponent from './endReward'
import UpdateListRequestComponent from './updateListRequest'
import UpdateSettingComponent from './updateSetting'
import ResetPasswordComponent from './resetPassword'
import CreateSettingMenu from './createSettingMenu'
import UpdateSettingMenu from './updateSettingMenu'
import UpdateUserChallengeRank from './updateUserChallengeRank'
class DialogComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      view: {}
    }

    this.handleClose = this.handleClose.bind(this)

  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('DialogComponent execute UNSAFE_componentWillMount')
      const { view } = this.state
      view['current'] = DialogEnum.VIEW.DEFAULT;
      view[DialogEnum.VIEW.CONFIRM] = <ConfirmComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.EXPIRED_TOKEN] = <ExpiredTokenComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.NOTIFY] = <NotifyComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.REMOVE_POST] = <RemovePostComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.EDIT_TARGET_POST] = <EditTargetPostComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_CHALLENGE_POST_RESULT] = <UpdateChallengePostResult handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_CHALLENGE_RESULT] = <UpdateChallengeResult handleClose={this.handleClose} />
      view[DialogEnum.VIEW.REMOVE_SUB_CHALLENGE] = <RemoveSubChallenge handleClose={this.handleClose} />
      view[DialogEnum.VIEW.APPROVE_SUB_CHALLENGE] = <ApproveSubChallenge handleClose={this.handleClose} />
      view[DialogEnum.VIEW.REMOVE_MISSION] = <RemoveMission handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_USER_CHALLENGE_MISSION] = <UpdateUserChallengeMission handleClose={this.handleClose} />
      view[DialogEnum.VIEW.APPLY_CHALLENGE] = <ApplyChallenge handleClose={this.handleClose} />
      view[DialogEnum.VIEW.END_CHALLENGE] = <EndChallenge handleClose={this.handleClose} />
      view[DialogEnum.VIEW.SEND_NOTIFICATION] = <SendNotificationChallenge handleClose={this.handleClose} />
      view[DialogEnum.VIEW.SEND_NOTIFICATION_POST] = <SendNotificationPost handleClose={this.handleClose} />
      view[DialogEnum.VIEW.CREATE_NOTIFICATION] = <CreateNotification handleClose={this.handleClose} />
      view[DialogEnum.VIEW.APPLY_REWARD] = <ApplyRewardComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.END_REWARD] = <EndRewardComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_LIST_REQUEST] = <UpdateListRequestComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_SETTING] = <UpdateSettingComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.RESET_PASSWORD] = <ResetPasswordComponent handleClose={this.handleClose} />
      view[DialogEnum.VIEW.CREATE_SETTING_MENU] = <CreateSettingMenu handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_SETTING_MENU] = <UpdateSettingMenu handleClose={this.handleClose} />
      view[DialogEnum.VIEW.UPDATE_USER_CHALLENGE_RANK] = <UpdateUserChallengeRank handleClose={this.handleClose} />
    } catch (e) {
      Logger.error(`DialogComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      Logger.info('DialogComponent execute UNSAFE_componentWillReceiveProps')
      const dialog = nextProps.allReducer.dialog
      Logger.debug(`Receive dialog`, dialog)
      if (this.props.dialog !== dialog) {
        const { view } = this.state;
        view.current = dialog.view
        this.setState({
          view: view
        })
      }
    } catch (e) {
      Logger.error(`DialogComponent componentWillReceiveProps ${e.toString()}`)
    }
  }

  handleClose(event) {
    try {
      Logger.info('DialogComponent execute handleClose')
      if (event) event.preventDefault();
      const { update } = this.props;
      const userDialog = new Model()
      userDialog.setView(DialogEnum.VIEW.DEFAULT)
      update(userDialog)
      document.body.style.overflow = "initial";
    } catch (e) {
      Logger.error(`DialogComponent handleClose ${e.toString()}`)
    }
  }

  render() {
    const { view } = this.state
    return (
      <Fragment>
        {(view.current !== DialogEnum.VIEW.DEFAULT) ? <DialogHtml view={view} /> : null}
      </Fragment>
    )
  }

}

export default DialogComponent
