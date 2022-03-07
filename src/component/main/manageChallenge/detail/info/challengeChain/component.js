/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import RouteEnum from 'service/enum/route'
import DialogModel from 'component/layout/dialog/model'
import DialogEnum from 'service/enum/dialog'
import ChallengeEnum from 'service/enum/challenge'
import Localize from "service/localize";
class ChallengeChainComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetDetailChallengeChainSuccess: this.handleGetDetailChallengeChainSuccess.bind(this)

      },
      ui: {
        list: null,
        total: 0,
        resetPage: true,
        detailSubChallenge: [],
        detailChallenge: null,
        redirect: true,
        isIndexShowVertical: -1
      },
    }
    this.handleCreateMission = this.handleCreateMission.bind(this)
    this.handleRedirectDetailSubChallenge = this.handleRedirectDetailSubChallenge.bind(this)
    this.handleApproveSubChallenge = this.handleApproveSubChallenge.bind(this)
    this.handleRemoveMission = this.handleRemoveMission.bind(this)
    this.handleRedirectDetailMission = this.handleRedirectDetailMission.bind(this)
    this.handleUploadPageApproveSubChallenge = this.handleUploadPageApproveSubChallenge.bind(this)
    this.handleChangePositionMissionSuccess = this.handleChangePositionMissionSuccess.bind(this)
    this.handleShowVertical = this.handleShowVertical.bind(this)
    this.handleHiddenVertical = this.handleHiddenVertical.bind(this)
  }
  handleGetDetailChallengeChainSuccess(response) {
    try {
      Logger.info('ChallengeChainComponent execute handleGetDetailChallengeChainSuccess')
      const { ui } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailSubChallenge = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ChallengeChainComponent handleGetDetailChallengeChainSuccess ${e.toString()}`)
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
  componentWillUnmount() {
    try {
      Logger.info('ChallengeChainComponent execute componentWillUnmount')

    } catch (e) {
      Logger.error(`ChallengeChainComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ChallengeChainComponent execute UNSAFE_componentWillMount')
      const { ui, timeout } = this.state
      const { location } = this.props
      ui.detailChallenge = location.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`ChallengeChainComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ChallengeChainComponent execute componentDidMount')
    }
    catch (e) {
      Logger.error(`ChallengeChainComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleRequest() {
    try {
      Logger.info('ChallengeChainComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getDetailChallengeChain, location } = this.props

      getDetailChallengeChain(timeout.key, ui.detailChallenge.challengeId)

    } catch (e) {
      Logger.error(`ChallengeChainComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleCreateMission(item) {
    try {
      Logger.info('ChallengeChainComponent execute handleCreateMission')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.CREATE_MISSION
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      this.handleRedirectWithState(path, { ...item, mainChallengeId: ui.detailChallenge.challengeId, tab: this.props.ui.tab.current })
    } catch (e) {
      Logger.error(`ChallengeChainComponent handleCreateMission ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetailMission(item) {
    try {
      Logger.info('ChallengeChainComponent execute handleRedirectDetailMission')
      Logger.debug('ChallengeChainComponent execute handleRedirectDetailMission recieve item', item)
      const { ui } = this.state
      if (ui.redirect) {
        let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL_MISSION
        const path = route.replace(':id', ui.detailChallenge.challengeId)
        this.handleRedirectWithState(path, { ...item, mainChallengeId: ui.detailChallenge.challengeId, tab: this.props.ui.tab.current })
      }
    } catch (e) {
      Logger.error(`ChallengeChainComponent handleRedirectDetailMission ${e.toString()}`)
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleRemoveMission(item) {
    try {
      Logger.info('ChallengeChainComponent execute handleRemoveMission')
      const { updateModal } = this.props;
      const { ui, timeout } = this.state
      ui.redirect = false
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.REMOVE_MISSION)
      dialog.setContent({ missionId: item.missionId })
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
        ui.redirect = true
        ui.isIndexShowVertical = -1
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`ChallengeChainComponent handleRemoveMission ${e.toString()}`)
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleUploadPageApproveSubChallenge(index) {
    try {
      Logger.info('ChallengeChainComponent execute handleRemoveMission')
      const { ui, timeout } = this.state
      ui.detailSubChallenge[index].status = ChallengeEnum.STATUS.APPLY
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListPostComponent handleRemoveMission ${e.toString()}`)
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleRedirectDetailSubChallenge(item) {
    try {
      Logger.info('ChallengeChainComponent execute handleRedirectDetailSubChallenge')
      Logger.debug('ChallengeChainComponent execute handleRedirectDetailSubChallenge recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL_SUB_CHALLENGE
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      item.tab = this.props.ui.tab.current
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ChallengeChainComponent handleRedirectDetailSubChallenge ${e.toString()}`)
      const { timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleApproveSubChallenge(index, item) {
    try {
      Logger.info('ChallengeChainComponent execute handleRedirectDetailSubChallenge')
      Logger.debug('ChallengeChainComponent execute handleRedirectDetailSubChallenge recieve item', item)
      const { updateModal } = this.props
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.APPROVE_SUB_CHALLENGE)
      dialog.setContent({ challengeId: item.challengeId })
      dialog.setHandleConfirm(() => { this.handleUploadPageApproveSubChallenge(index) })
      updateModal(dialog)

    } catch (e) {
      Logger.error(`ChallengeChainComponent handleRedirectDetailSubChallenge ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleChangePositionMissionSuccess() {
    try {
      Logger.info('ChallengeChainComponent execute handleChangePositionMissionSuccess')
      const { ui, timeout } = this.state;
      timeout.setTimeout()

    } catch (e) {
      Logger.error(`ChallengeChainComponent handleChangePositionMissionSuccess ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }

  }
  handleShowVertical(value) {
    try {
      Logger.info('ChallengeChainComponent execute handleShowVertical')
      const { ui } = this.state;
      ui.isIndexShowVertical = value
      this.setState({ ui });

    } catch (e) {
      Logger.error(`ChallengeChainComponent handleShowVertical ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleHiddenVertical(value) {
    try {
      Logger.info('ChallengeChainComponent execute handleShowVertical')
      const { ui } = this.state;
      ui.isIndexShowVertical = -1
      this.setState({ ui });

    } catch (e) {
      Logger.error(`ChallengeChainComponent handleShowVertical ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  render() {
    const { ui, timeout } = this.state
    return <View ui={ui} timeout={timeout}
      handleCreateMission={this.handleCreateMission}
      handleRemoveMission={this.handleRemoveMission}
      handleRedirectDetailSubChallenge={this.handleRedirectDetailSubChallenge}
      handleApproveSubChallenge={this.handleApproveSubChallenge}
      handleRedirectDetailMission={this.handleRedirectDetailMission}
      handleChangePositionMissionSuccess={this.handleChangePositionMissionSuccess}
      handleShowVertical={this.handleShowVertical}
      handleHiddenVertical={this.handleHiddenVertical}

    />

  }
}

export default BaseComponent(ChallengeChainComponent)
