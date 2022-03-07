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
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Localize from "service/localize";
class DetailMissionComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetDetailMissionSuccess: this.handleGetDetailMissionSuccess.bind(this),
        handleGetDetailMissionFailed: this.handleGetDetailMissionFailed.bind(this)

      },
      ui: {
        mainChallengeId: null,
        detailMission: null
      },
    }
    this.handleOnBack = this.handleOnBack.bind(this)
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
  handleGetDetailMissionSuccess(response) {
    try {
      Logger.info('DetailMissionComponent execute handleGetDetailSubChallengeSuccess')
      const { ui, timeout, data } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailMission = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`DetailMissionComponent handleGetDetailSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleGetDetailMissionFailed(response) {
    try {
      Logger.info('DetailMissionComponent execute handleGetDetailSubChallengeSuccess')
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      this.state.timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`DetailMissionComponent handleGetDetailSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentWillUnmount() {
    try {
      Logger.info('DashboardComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`DashboardComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('DashboardComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { location } = this.props
      ui.mainChallengeId = location.state.mainChallengeId
    } catch (e) {
      Logger.error(`DashboardComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('DetailMissionComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`DetailMissionComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('DetailMissionComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { location } = this.props
      const detailMission = location.state
      const { getDetailMission } = this.props
      getDetailMission(timeout.key, detailMission.missionId)

    } catch (e) {
      Logger.error(`DetailMissionComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleOnBack() {
    try {
      Logger.info('DetailMissionComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', ui.mainChallengeId)
      this.handleRedirectWithState(path, { challengeId: ui.mainChallengeId, tab: this.props.location.state.tab })
    } catch (e) {
      Logger.error(`DetailMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return ui.detailMission ? <View ui={ui} timeout={timeout}
      handleOnBack={this.handleOnBack}
    /> : null
  }
}

export default BaseComponent(DetailMissionComponent)
