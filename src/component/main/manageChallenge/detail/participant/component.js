import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'

import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Localize from "service/localize";
import RouteEnum from 'service/enum/route'

import View from './view'
import { ModelView, ModelRequest } from './model'

class ListMissionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleConfirmUpdateUserChallengeSuccess: this.handleConfirmUpdateUserChallengeSuccess.bind(this),
        handleGetDetailUserChallengeSuccess: this.handleGetDetailUserChallengeSuccess.bind(this)
      },
      ui: {
        detailParticipant: null,
        challengeType: null
      },
      req: {
        current: 0,
        detailPost: 1,
      }
    }

    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleUpdateUserChallengeRank = this.handleUpdateUserChallengeRank.bind(this)
    this.handleUpdateChallengeMissionSuccess = this.handleUpdateChallengeMissionSuccess.bind(this)

  }
  handleGetDetailUserChallengeSuccess(response) {
    try {
      Logger.info('ListMissionComponent execute handleConfirmUpdateUserChallengeSuccess')
      const { ui } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailParticipant = response
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
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
  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListMissionComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      const detailParticipant = { ...location.state }

      ui.challengeType = detailParticipant.challengeType
      data['userId'] = detailParticipant.userId
      data['challengeId'] = detailParticipant.challengeId
    }
    catch (e) {
      Logger.error(`ListMissionComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListMissionComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`ListMissionComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListMissionComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailUserChallenge } = this.props
      getDetailUserChallenge(timeout.key, data)

    } catch (e) {
      Logger.error(`ListMissionComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnBack() {
    try {
      Logger.info('ListMissionComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', ui.detailParticipant.challengeId)
      this.handleRedirectWithState(path, this.props.location.state)
      //this.props.history.goBack()
    } catch (e) {
      Logger.error(`ListMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateChallengeMissionSuccess(status) {
    try {
      Logger.info('ListMissionComponent execute handleUpdateChallengeMissionSuccess')
      const { ui } = this.state

      ui.detailParticipant.result = status
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleConfirmUpdateUserChallengeSuccess(status) {
    try {
      Logger.info('ListMissionComponent execute handleConfirmUpdateUserChallengeSuccess')
      const { ui } = this.state
      ui.detailParticipant.result = status
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateUserChallengeRank() {
    try {
      Logger.info('ListMissionComponent execute handleUpdateUserChallengeRank')
      const { ui } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.UPDATE_USER_CHALLENGE_RANK)
      dialog.setContent(ui.detailParticipant)
      dialog.setHandleConfirm((data) => {
        ui.detailParticipant = data
        this.setState({ ui });
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`ListMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { ui, timeout, data } = this.state
    return ui.detailParticipant ? <View ui={ui} data={data} timeout={timeout}
      handleOnBack={this.handleOnBack}
      handleUpdateUserChallengeRank={this.handleUpdateUserChallengeRank}
      handleUpdateChallengeMissionSuccess={this.handleUpdateChallengeMissionSuccess}
    /> : null
  }
}

export default BaseComponent(ListMissionComponent)