import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'

import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import View from './view'
import { ModelView, ModelRequest } from './model'
import ChallengeEnum from 'service/enum/challenge'
import Localize from "service/localize";
class InfoChallengeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailChallengeSuccess: this.handleGetDetailChallengeSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      },
      ui: {
        postId: {},
        detailChallenge: null,
        tab: {
          current: 1,
          detail: 1,
          participant: 2,
          mission: 3,
          setting: 4
        }
      },
      req: {

      },


    }
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleUpdateChallengeResult = this.handleUpdateChallengeResult.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleCreateSubChallenge = this.handleCreateSubChallenge.bind(this)
    this.handleApplyChallenge = this.handleApplyChallenge.bind(this)
    this.handleEndChallenge = this.handleEndChallenge.bind(this)
    this.handleSendNotification = this.handleSendNotification.bind(this)
    this.handleCreateSettingPrize = this.handleCreateSettingPrize.bind(this)
  }

  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleGetDetailChallengeSuccess(response) {
    try {
      Logger.info('InfoChallengeComponent execute handleGetDetailChallengeSuccess')
      const { ui } = this.state

      this.state.timeout.setTimeout(false)
      ui.detailChallenge = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleGetDetailChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoChallengeComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { state } = this.props.location

      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)
      const { location } = this.props
      const detailChallenge = { ...location.state }
      data['challengeId'] = detailChallenge.challengeId
    }
    catch (e) {
      Logger.error(`InfoChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoChallengeComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`InfoChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailChallenge } = this.props
      getDetailChallenge(timeout.key, data.challengeId)

    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleOnBack() {
    try {
      Logger.info('InfoChallengeComponent execute handleOnBack')
      let path = RouteEnum.PAGE.MANAGE_CHALLENGE._
      this.handleRedirectWithState(path)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleEdit() {
    try {
      Logger.info('InfoChallengeComponent execute handleEdit')
      const { ui, timeout } = this.state
      const route = RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      this.handleRedirectWithState(path, ui.detailChallenge)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateChallengeResult() {
    try {
      Logger.info('InfoChallengeComponent execute handleUpdateChallengeResult')
      const { ui, timeout } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.UPDATE_CHALLENGE_RESULT)
      dialog.setTitle('Công bố kết quả')
      dialog.setContent({ challengeId: ui.detailChallenge.challengeId })
      dialog.setHandleConfirm(() => {
        ui.detailChallenge.status = ChallengeEnum.STATUS.RESULT
        this.setState({ ui });
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleUpdateResult ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info('InfoChallengeComponent execute handleChangeTab')
      Logger.debug('InfoChallengeComponent execute handleChangeTab recieve value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui, data } = this.state
      switch (value) {
        case `${ui.tab.detail}`:
          ui.tab.current = ui.tab.detail;
          break;
        case `${ui.tab.participant}`:
          ui.tab.current = ui.tab.participant;
          break;
        case `${ui.tab.mission}`:
          ui.tab.current = ui.tab.mission;
          break;
        case `${ui.tab.setting}`:
          ui.tab.current = ui.tab.setting;
          break;
      }
      this.setState({ ui })
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleChangeTab ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  };
  handleCreateSubChallenge() {
    try {
      Logger.info('InfoChallengeComponent execute handleCreateSubChallenge')
      //Logger.debug('ListPostComponent execute handleCreateSubChallenge recieve item', ui.detailChallenge)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_SUB_CHALLENGE
      const path = route.replace(':id', ui.detailChallenge.challengeId)

      this.handleRedirectWithState(path, { ...ui.detailChallenge, tab: ui.tab.current })
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleCreateSubChallenge ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleReloadSubChallenge() {
    try {
      Logger.info('InfoChallengeComponent execute handleCreateSubChallenge')
      //Logger.debug('ListPostComponent execute handleCreateSubChallenge recieve item', ui.detailChallenge)
      this.handleChangeTab(ui.tab.mission)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleCreateSubChallenge ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleApplyChallenge() {
    try {
      Logger.info('InfoChallengeComponent execute handleApplyChallenge')
      const { ui } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.APPLY_CHALLENGE)
      dialog.setContent({ challengeId: ui.detailChallenge.challengeId })
      dialog.setHandleConfirm(() => {
        ui.detailChallenge.status = ChallengeEnum.STATUS.APPLY
        this.setState({ ui });
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleUpdateResult ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleEndChallenge() {
    try {
      Logger.info('InfoChallengeComponent execute handleEndChallenge')
      const { ui, timeout } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.END_CHALLENGE)
      dialog.setContent({ challengeId: ui.detailChallenge.challengeId })
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleUpdateResult ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSendNotification() {
    try {
      Logger.info('InfoChallengeComponent execute handleSendNotification')
      const { ui, timeout } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.SEND_NOTIFICATION)
      dialog.setContent(ui.detailChallenge)
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleSendNotification ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateSettingPrize() {
    try {
      Logger.info('InfoChallengeComponent execute handleCreateSettingPrize')
      //Logger.debug('ListPostComponent execute handleCreateSubChallenge recieve item', ui.detailChallenge)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_SETTING_PRIZE
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      this.handleRedirectWithState(path, { ...ui.detailChallenge, tab: ui.tab.current })
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleCreateSettingPrize ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  render() {
    const { ui, timeout, data } = this.state
    return ui.detailChallenge ? <View ui={ui} data={data} timeout={timeout}
      handleOnBack={this.handleOnBack}
      handleEdit={this.handleEdit}
      handleUpdateChallengeResult={this.handleUpdateChallengeResult}
      handleChangeTab={this.handleChangeTab}
      handleCreateSubChallenge={this.handleCreateSubChallenge}
      handleReloadSubChallenge={this.handleReloadSubChallenge}
      handleApplyChallenge={this.handleApplyChallenge}
      handleEndChallenge={this.handleEndChallenge}
      handleSendNotification={this.handleSendNotification}
      handleCreateSettingPrize={this.handleCreateSettingPrize}
    /> : null
  }
}

export default BaseComponent(InfoChallengeComponent)